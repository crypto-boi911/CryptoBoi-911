
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, amount, currency = 'USDT' } = await req.json();
    
    const nowpaymentsApiKey = Deno.env.get('NOWPAYMENTS_API_KEY');
    if (!nowpaymentsApiKey) {
      throw new Error('NOWPayments API key not configured');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Create payment with NOWPayments
    const paymentData = {
      price_amount: amount,
      price_currency: 'USD',
      pay_currency: currency,
      order_id: orderId,
      order_description: `Order payment for ${orderId}`,
    };

    const nowPaymentsResponse = await fetch('https://api.nowpayments.io/v1/payment', {
      method: 'POST',
      headers: {
        'x-api-key': nowpaymentsApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!nowPaymentsResponse.ok) {
      const errorData = await nowPaymentsResponse.text();
      throw new Error(`NOWPayments API error: ${errorData}`);
    }

    const paymentResult = await nowPaymentsResponse.json();

    // Save payment to our database
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        order_id: orderId,
        user_id: user.id,
        payment_id: paymentResult.payment_id,
        pay_address: paymentResult.pay_address,
        amount: paymentResult.pay_amount,
        currency: paymentResult.pay_currency,
        status: paymentResult.payment_status || 'pending'
      })
      .select()
      .single();

    if (paymentError) {
      throw new Error(`Database error: ${paymentError.message}`);
    }

    return new Response(JSON.stringify(payment), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-crypto-payment:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
