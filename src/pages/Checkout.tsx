
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, isLoading, logActivity } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [paymentData, setPaymentData] = useState({
    cryptoAddress: '',
    paymentMethod: 'Bitcoin'
  });
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
      return;
    }
  }, [user, isLoading, navigate]);

  // Load cart data and calculate total
  useEffect(() => {
    const loadCartData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;
        
        if (!data || data.length === 0) {
          toast({
            title: "Empty Cart",
            description: "Your cart is empty. Redirecting to dashboard.",
            variant: "destructive"
          });
          navigate('/dashboard/cart');
          return;
        }

        setCartItems(data);
        
        // Calculate total (including tax)
        const subtotal = data.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        setOrderTotal(total);

        await logActivity('CHECKOUT_VIEW', { itemCount: data.length, total });
      } catch (error) {
        console.error('Error loading cart for checkout:', error);
        toast({
          title: "Error",
          description: "Failed to load cart data for checkout",
          variant: "destructive"
        });
        navigate('/dashboard/cart');
      }
    };

    if (user && !isLoading) {
      loadCartData();
    }
  }, [user, isLoading, navigate, toast, logActivity]);

  const handleProcessPayment = async () => {
    if (!paymentData.cryptoAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid crypto address",
        variant: "destructive"
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Error",
        description: "No items in cart to process",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create order in Supabase
      const orderData = {
        user_id: user!.id,
        items: cartItems,
        total: orderTotal,
        status: 'pending',
        payment_method: paymentData.paymentMethod,
        crypto_address: paymentData.cryptoAddress
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update order status to completed
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', order.id);

      if (updateError) throw updateError;

      // Clear cart after successful order
      const { error: clearCartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user!.id);

      if (clearCartError) throw clearCartError;

      // Log successful order
      await logActivity('ORDER_COMPLETED', { 
        orderId: order.id, 
        total: orderTotal,
        paymentMethod: paymentData.paymentMethod 
      });
      
      toast({
        title: "Payment Successful!",
        description: `Your order #${order.id.slice(0, 8)} has been processed successfully`,
      });
      
      navigate('/dashboard/orders');
    } catch (error) {
      console.error('Payment processing error:', error);
      
      await logActivity('ORDER_FAILED', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        total: orderTotal 
      });
      
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
        <div className="text-cyber-light flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyber-blue"></div>
          Loading checkout...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-gradient p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard/cart')}
              className="border-cyber-blue/30 text-cyber-light hover:bg-cyber-blue/10"
              disabled={isProcessing}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </div>
          <h1 className="text-3xl font-cyber font-bold text-cyber-light mb-4 flex items-center gap-3">
            <Lock className="h-8 w-8" />
            Secure Checkout
          </h1>
        </div>

        <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 mb-6">
          <CardHeader>
            <CardTitle className="text-cyber-light font-tech">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-cyber-light/70">
                    {item.product_name} x{item.quantity}
                  </span>
                  <span className="text-cyber-light">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-cyber-blue/20 pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-cyber-light">Total</span>
                  <span className="text-green-400">${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
          <CardHeader>
            <CardTitle className="text-cyber-light font-tech flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod" className="text-cyber-light">
                Payment Method
              </Label>
              <select
                id="paymentMethod"
                value={paymentData.paymentMethod}
                onChange={(e) => setPaymentData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                className="w-full bg-cyber-darker/40 border border-cyber-blue/30 text-cyber-light rounded px-3 py-2"
                disabled={isProcessing}
              >
                <option value="Bitcoin">Bitcoin (BTC)</option>
                <option value="Ethereum">Ethereum (ETH)</option>
                <option value="USDT">Tether (USDT)</option>
                <option value="Litecoin">Litecoin (LTC)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cryptoAddress" className="text-cyber-light">
                Your {paymentData.paymentMethod} Address *
              </Label>
              <Input
                id="cryptoAddress"
                type="text"
                placeholder={`Enter your ${paymentData.paymentMethod} address`}
                value={paymentData.cryptoAddress}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cryptoAddress: e.target.value }))}
                className="bg-cyber-darker/40 border-cyber-blue/30 text-cyber-light placeholder:text-cyber-light/40"
                disabled={isProcessing}
              />
              <p className="text-cyber-light/60 text-sm">
                We'll send your purchased items to this address after payment confirmation
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleProcessPayment}
                disabled={isProcessing || !paymentData.cryptoAddress.trim() || cartItems.length === 0}
                className="w-full bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80 font-tech"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyber-dark mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Purchase (${orderTotal.toFixed(2)})
                  </>
                )}
              </Button>
            </div>

            <div className="text-center text-cyber-light/60 text-sm">
              <Lock className="h-4 w-4 inline mr-1" />
              Your payment is secured with end-to-end encryption
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Checkout;
