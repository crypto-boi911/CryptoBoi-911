
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
    const { orderId, amount, currency = 'usdt' } = await req.json();
    
    // Validate input
    if (!orderId || !amount) {
      throw new Error('Missing required fields: orderId and amount');
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new Error('Invalid amount: must be a positive number');
    }

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

    console.log('Creating payment for order:', orderId, 'amount:', numericAmount, 'currency:', currency);

    // Create payment with NOWPayments using correct format
    const paymentData = {
      price_amount: numericAmount,
      price_currency: 'usd',
      pay_currency: currency.toLowerCase(),
      order_id: orderId,
      order_description: `HUXLOGS order ${orderId}`,
      ipn_callback_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/nowpayments-webhook`
    };

    console.log('NOWPayments request payload:', JSON.stringify(paymentData, null, 2));

    const nowPaymentsResponse = await fetch('https://api.nowpayments.io/v1/payment', {
      method: 'POST',
      headers: {
        'x-api-key': nowpaymentsApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    console.log('NOWPayments response status:', nowPaymentsResponse.status);

    if (!nowPaymentsResponse.ok) {
      let errorMessage = 'NOWPayments API error';
      try {
        const errorData = await nowPaymentsResponse.json();
        console.error('NOWPayments error response:', errorData);
        errorMessage = errorData.message || errorData.error || `HTTP ${nowPaymentsResponse.status}`;
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
        errorMessage = `HTTP ${nowPaymentsResponse.status}: ${nowPaymentsResponse.statusText}`;
      }
      throw new Error(`NOWPayments API error: ${errorMessage}`);
    }

    const paymentResult = await nowPaymentsResponse.json();
    console.log('NOWPayments success response:', paymentResult);

    // Validate response structure
    if (!paymentResult.payment_id || !paymentResult.pay_address) {
      throw new Error('Invalid response from NOWPayments: missing required fields');
    }

    // Save payment to our database
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        order_id: orderId,
        user_id: user.id,
        payment_id: paymentResult.payment_id,
        pay_address: paymentResult.pay_address,
        amount: paymentResult.pay_amount || numericAmount,
        currency: paymentResult.pay_currency || currency,
        status: paymentResult.payment_status || 'waiting'
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Database error:', paymentError);
      throw new Error(`Database error: ${paymentError.message}`);
    }

    console.log('Payment saved successfully:', payment);

    return new Response(JSON.stringify(payment), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-crypto-payment:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check the server logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
