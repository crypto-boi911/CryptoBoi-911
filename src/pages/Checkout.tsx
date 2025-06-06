
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Check, Bitcoin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CryptoPayment from '@/components/CryptoPayment';

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
  };
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'demo'>('demo');
  const [showCryptoPayment, setShowCryptoPayment] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const { data, error } = await supabase
        .from('cart')
        .select(`
          id,
          quantity,
          product:products (
            id,
            name,
            price,
            category
          )
        `)
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error fetching cart items:', error);
        return;
      }

      if (!data || data.length === 0) {
        navigate('/dashboard/cart');
        return;
      }

      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const processOrder = async () => {
    if (!user || cartItems.length === 0) return;

    setIsProcessing(true);
    try {
      // Create order
      const orderItems = cartItems.map(item => ({
        product_id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        category: item.product.category
      }));

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          items: orderItems,
          total: calculateTotal(),
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      setCurrentOrderId(order.id);

      if (paymentMethod === 'crypto') {
        // Show crypto payment interface
        setShowCryptoPayment(true);
      } else {
        // Demo payment - mark as paid immediately
        const { error: updateError } = await supabase
          .from('orders')
          .update({ status: 'paid' })
          .eq('id', order.id);

        if (updateError) throw updateError;

        // Clear cart
        const { error: clearCartError } = await supabase
          .from('cart')
          .delete()
          .eq('user_id', user.id);

        if (clearCartError) throw clearCartError;

        toast({
          title: "Order Placed Successfully!",
          description: `Order #${order.id.slice(0, 8)} has been created`,
        });

        navigate('/dashboard/orders');
      }
    } catch (error: any) {
      toast({
        title: "Error Processing Order",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCryptoPaymentConfirmed = async () => {
    // Clear cart after successful payment
    try {
      const { error: clearCartError } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id);

      if (clearCartError) throw clearCartError;

      toast({
        title: "Payment Confirmed!",
        description: "Your order has been successfully processed",
      });

      navigate('/dashboard/orders');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCancelCryptoPayment = () => {
    setShowCryptoPayment(false);
    setCurrentOrderId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient pt-20 flex items-center justify-center">
        <div className="text-cyber-blue text-xl">Loading checkout...</div>
      </div>
    );
  }

  if (showCryptoPayment && currentOrderId) {
    return (
      <CryptoPayment
        orderId={currentOrderId}
        amount={calculateTotal()}
        onPaymentConfirmed={handleCryptoPaymentConfirmed}
        onCancel={handleCancelCryptoPayment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cyber-gradient pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
              Checkout
            </h1>
            <p className="text-xl text-cyber-light/70">
              Review your order and select payment method
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-cyber-darker/60 border-cyber-blue/30">
              <CardHeader>
                <CardTitle className="text-cyber-light font-tech">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-cyber-gray/20 rounded-lg">
                    <div>
                      <h3 className="text-cyber-light font-medium">{item.product.name}</h3>
                      <p className="text-cyber-light/60 text-sm">{item.product.category}</p>
                      <p className="text-cyber-blue text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-cyber-light/60 text-sm">
                        ${item.product.price} each
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t border-cyber-blue/20 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-cyber-light">Total:</span>
                    <span className="text-green-400">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cyber-darker/60 border-cyber-blue/30">
              <CardHeader>
                <CardTitle className="text-cyber-light font-tech">
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'crypto' 
                        ? 'border-cyber-blue bg-cyber-blue/20' 
                        : 'border-cyber-blue/30 hover:border-cyber-blue/50'
                    }`}
                    onClick={() => setPaymentMethod('crypto')}
                  >
                    <div className="flex items-center gap-3">
                      <Bitcoin className="h-6 w-6 text-orange-400" />
                      <div>
                        <h3 className="text-cyber-light font-medium">Cryptocurrency Payment</h3>
                        <p className="text-cyber-light/60 text-sm">Pay with USDT, BTC, ETH, and more</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'demo' 
                        ? 'border-cyber-blue bg-cyber-blue/20' 
                        : 'border-cyber-blue/30 hover:border-cyber-blue/50'
                    }`}
                    onClick={() => setPaymentMethod('demo')}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6 text-cyber-blue" />
                      <div>
                        <h3 className="text-cyber-light font-medium">Demo Payment</h3>
                        <p className="text-cyber-light/60 text-sm">For demonstration purposes</p>
                      </div>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'demo' && (
                  <div className="text-center py-4">
                    <p className="text-cyber-light/70 mb-4">
                      For demo purposes, this will create a completed order
                    </p>
                  </div>
                )}

                <Button
                  onClick={processOrder}
                  disabled={isProcessing}
                  className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech text-lg py-6"
                  size="lg"
                >
                  {isProcessing ? (
                    'Processing Order...'
                  ) : (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      {paymentMethod === 'crypto' 
                        ? `Pay with Crypto - $${calculateTotal().toFixed(2)}`
                        : `Place Order - $${calculateTotal().toFixed(2)}`
                      }
                    </>
                  )}
                </Button>

                <p className="text-cyber-light/60 text-xs text-center">
                  By placing this order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
