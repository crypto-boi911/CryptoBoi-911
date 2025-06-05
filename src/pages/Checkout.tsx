
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

const Checkout = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cryptoAddress: '',
    amount: 0
  });

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
      return;
    }

    // Get cart total from localStorage or navigation state
    const cartTotal = localStorage.getItem('cartTotal');
    if (cartTotal) {
      setPaymentData(prev => ({ ...prev, amount: parseFloat(cartTotal) }));
    }
  }, [user, isLoading, navigate]);

  const handleProcessPayment = async () => {
    if (!paymentData.cryptoAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid crypto address",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: "Your order has been processed successfully",
      });
      
      // Clear cart and redirect
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartTotal');
      navigate('/dashboard/orders');
    } catch (error) {
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
        <div className="text-cyber-light">Loading...</div>
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

        <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
          <CardHeader>
            <CardTitle className="text-cyber-light font-tech flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-cyber-light">
                Total Amount
              </Label>
              <Input
                id="amount"
                type="text"
                value={`$${paymentData.amount.toFixed(2)}`}
                disabled
                className="bg-cyber-darker/40 border-cyber-blue/30 text-cyber-light"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cryptoAddress" className="text-cyber-light">
                Your Crypto Address *
              </Label>
              <Input
                id="cryptoAddress"
                type="text"
                placeholder="Enter your cryptocurrency address"
                value={paymentData.cryptoAddress}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cryptoAddress: e.target.value }))}
                className="bg-cyber-darker/40 border-cyber-blue/30 text-cyber-light placeholder:text-cyber-light/40"
              />
              <p className="text-cyber-light/60 text-sm">
                We'll send your purchased items to this address
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleProcessPayment}
                disabled={isProcessing || !paymentData.cryptoAddress.trim()}
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
                    Complete Purchase
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
