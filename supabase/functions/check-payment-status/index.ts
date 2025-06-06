
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
    const { paymentId } = await req.json();
    
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

    // Check payment status with NOWPayments
    const statusResponse = await fetch(`https://api.nowpayments.io/v1/payment/${paymentId}`, {
      method: 'GET',
      headers: {
        'x-api-key': nowpaymentsApiKey,
      },
    });

    if (!statusResponse.ok) {
      throw new Error('Failed to check payment status');
    }

    const statusData = await statusResponse.json();

    // Update payment status in our database
    const { data: payment, error: updateError } = await supabaseClient
      .from('payments')
      .update({ 
        status: statusData.payment_status,
        updated_at: new Date().toISOString()
      })
      .eq('payment_id', paymentId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Database update error: ${updateError.message}`);
    }

    // If payment is confirmed, update order status
    if (statusData.payment_status === 'confirmed' || statusData.payment_status === 'finished') {
      const { error: orderError } = await supabaseClient
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', payment.order_id);

      if (orderError) {
        console.error('Error updating order status:', orderError);
      }
    }

    return new Response(JSON.stringify({
      status: statusData.payment_status,
      payment: payment
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in check-payment-status:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
