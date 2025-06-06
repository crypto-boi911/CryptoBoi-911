
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cryptoAddress: '',
    paymentMethod: 'Bitcoin'
  });

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Checkout temporarily disabled for rebuild');
    }, 1000);
  };

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
          <p className="text-cyber-light/70">Temporarily disabled for rebuild</p>
        </div>

        <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 mb-6">
          <CardHeader>
            <CardTitle className="text-cyber-light font-tech">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-cyber-light/60">No items available - system offline</p>
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
                disabled={true}
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
                placeholder="Disabled for rebuild"
                value={paymentData.cryptoAddress}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cryptoAddress: e.target.value }))}
                className="bg-cyber-darker/40 border-cyber-blue/30 text-cyber-light placeholder:text-cyber-light/40"
                disabled={true}
              />
              <p className="text-cyber-light/60 text-sm">
                Checkout temporarily disabled for system rebuild
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleProcessPayment}
                disabled={true}
                className="w-full bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80 font-tech opacity-50"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Checkout Disabled
              </Button>
            </div>

            <div className="text-center text-cyber-light/60 text-sm">
              <Lock className="h-4 w-4 inline mr-1" />
              System temporarily offline for rebuild
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Checkout;
