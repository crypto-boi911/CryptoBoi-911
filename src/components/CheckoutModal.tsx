
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Copy, Clock, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTierSystem } from '@/hooks/useTierSystem';
import { Badge } from '@/components/ui/badge';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  items?: Array<{ name: string; type: string; price: number; quantity: number }>;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, total, items = [] }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [paymentAddress, setPaymentAddress] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(1800);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const { toast } = useToast();
  const { applyDiscount, incrementCompletedOrders, currentTier } = useTierSystem();

  console.log('CheckoutModal render - isOpen:', isOpen, 'total:', total);

  // Calculate discounted totals
  const discountedItems = items.map(item => {
    const categoryMap: { [key: string]: string } = {
      'Bank Account': 'banklogs',
      'PayPal Account': 'paypallogs', 
      'CashApp Account': 'cashapplogs',
      'Credit Card': 'cards'
    };
    
    const category = categoryMap[item.type] || '';
    const discountInfo = applyDiscount(item.price, category);
    
    return {
      ...item,
      originalPrice: discountInfo.originalPrice,
      discountedPrice: discountInfo.discountedPrice,
      discount: discountInfo.discount
    };
  });

  const discountedTotal = discountedItems.reduce((sum, item) => 
    sum + (item.discountedPrice * item.quantity), 0
  );
  
  const totalSavings = total - discountedTotal;

  const cryptoOptions = [
    { 
      id: 'bitcoin', 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      rate: 45000,
      color: 'bg-orange-500'
    },
    { 
      id: 'ethereum', 
      name: 'Ethereum', 
      symbol: 'ETH', 
      rate: 3000,
      color: 'bg-blue-500'
    },
    { 
      id: 'usdt', 
      name: 'Tether', 
      symbol: 'USDT', 
      rate: 1,
      color: 'bg-green-500'
    },
    { 
      id: 'litecoin', 
      name: 'Litecoin', 
      symbol: 'LTC', 
      rate: 150,
      color: 'bg-gray-500'
    }
  ];

  // Reset modal state when it opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedCrypto(null);
      setPaymentAddress('');
      setTimeLeft(1800);
      setPaymentScreenshot(null);
    }
  }, [isOpen]);

  // Generate mock payment address when crypto is selected
  useEffect(() => {
    if (selectedCrypto && isOpen) {
      const generateAddress = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 34; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };
      setPaymentAddress(generateAddress());
      setTimeLeft(1800); // Reset timer
    }
  }, [selectedCrypto, isOpen]);

  // Countdown timer
  useEffect(() => {
    if (selectedCrypto && timeLeft > 0 && isOpen) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedCrypto, timeLeft, isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(paymentAddress);
      toast({
        title: "Address copied",
        description: "Payment address copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentScreenshot(file);
      toast({
        title: "Screenshot uploaded",
        description: "Payment screenshot has been uploaded successfully",
      });
    }
  };

  const handleSubmitPayment = () => {
    if (!paymentScreenshot) {
      toast({
        title: "Upload required",
        description: "Please upload a payment screenshot",
        variant: "destructive",
      });
      return;
    }

    if (timeLeft === 0) {
      toast({
        title: "Payment expired",
        description: "Payment session has expired. Please start a new payment.",
        variant: "destructive",
      });
      return;
    }

    // Increment completed orders
    incrementCompletedOrders();

    toast({
      title: "Payment submitted",
      description: "Your payment is being verified. You will receive confirmation shortly.",
    });
    onClose();
  };

  const getCryptoAmount = (cryptoId: string) => {
    const crypto = cryptoOptions.find(c => c.id === cryptoId);
    if (!crypto) return '0.00000000';
    return (discountedTotal / crypto.rate).toFixed(8);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      console.log('Dialog onOpenChange called with:', open);
      if (!open) {
        onClose();
      }
    }}>
      <DialogContent className="max-w-2xl bg-cyber-gray/95 border-cyber-blue/20 text-cyber-light max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-cyber-light font-tech text-xl">
            Cryptocurrency Payment
          </DialogTitle>
        </DialogHeader>

        {!selectedCrypto ? (
          <div className="space-y-4">
            {/* Tier Discount Summary */}
            {totalSavings > 0 && (
              <Card className="bg-green-500/20 border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <Percent className="h-5 w-5" />
                    <div>
                      <div className="font-tech">
                        {currentTier.name} Tier Discount Applied!
                      </div>
                      <div className="text-sm">
                        You saved ${totalSavings.toFixed(2)} on this order
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Summary with Discounts */}
            {discountedItems.length > 0 && (
              <Card className="bg-cyber-gray/30 border-cyber-blue/20">
                <CardHeader>
                  <CardTitle className="text-cyber-light font-tech text-sm">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {discountedItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-cyber-light/70">
                        {item.name} x{item.quantity}
                      </span>
                      <div className="flex items-center gap-2">
                        {item.discount > 0 && (
                          <Badge variant="outline" className="text-green-400 border-green-400/30 text-xs">
                            {item.discount}% off
                          </Badge>
                        )}
                        <div className="text-right">
                          {item.discount > 0 && (
                            <div className="text-cyber-light/40 line-through text-xs">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </div>
                          )}
                          <div className="text-green-400">
                            ${(item.discountedPrice * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Separator className="bg-cyber-blue/20" />
                  <div className="flex justify-between font-bold">
                    <span className="text-cyber-light">Total:</span>
                    <span className="text-green-400">${discountedTotal.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <p className="text-cyber-light/60">
              Select your preferred cryptocurrency for payment:
            </p>
            <div className="grid grid-cols-2 gap-4">
              {cryptoOptions.map((crypto) => (
                <Card 
                  key={crypto.id}
                  className="cursor-pointer hover:border-cyber-blue/50 transition-all duration-200 bg-cyber-gray/30 border-cyber-blue/20"
                  onClick={() => {
                    console.log('Selected crypto:', crypto.id);
                    setSelectedCrypto(crypto.id);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${crypto.color} flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">{crypto.symbol}</span>
                      </div>
                      <div>
                        <h3 className="text-cyber-light font-tech">{crypto.name}</h3>
                        <p className="text-cyber-light/60 text-sm">
                          {getCryptoAmount(crypto.id)} {crypto.symbol}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Timer */}
            <Card className="bg-red-500/20 border-red-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-red-400">
                  <Clock className="h-5 w-5" />
                  <span className="font-tech text-lg">
                    Time remaining: {formatTime(timeLeft)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card className="bg-cyber-gray/30 border-cyber-blue/20">
              <CardHeader>
                <CardTitle className="text-cyber-light font-tech">
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-cyber-light/60">Original Amount:</span>
                  <span className="text-cyber-light/60 line-through">${total.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-400">Tier Discount:</span>
                    <span className="text-green-400">-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold">
                  <span className="text-cyber-light">Final Amount (USD):</span>
                  <span className="text-cyber-light">${discountedTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-light/60">
                    Amount ({cryptoOptions.find(c => c.id === selectedCrypto)?.symbol}):
                  </span>
                  <span className="text-green-400 font-bold">
                    {getCryptoAmount(selectedCrypto)} {cryptoOptions.find(c => c.id === selectedCrypto)?.symbol}
                  </span>
                </div>
                <Separator className="bg-cyber-blue/20" />
                
                {/* Payment Address */}
                <div className="space-y-2">
                  <Label className="text-cyber-light">Payment Address:</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={paymentAddress}
                      readOnly
                      className="bg-cyber-gray/50 border-cyber-blue/30 text-cyber-light"
                    />
                    <Button 
                      onClick={copyAddress}
                      variant="outline"
                      size="sm"
                      className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Screenshot Upload */}
            <Card className="bg-cyber-gray/30 border-cyber-blue/20">
              <CardHeader>
                <CardTitle className="text-cyber-light font-tech">
                  Upload Payment Screenshot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-cyber-blue/30 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-cyber-blue mx-auto mb-4" />
                  <p className="text-cyber-light/60 mb-4">
                    Upload screenshot of your payment transaction
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="bg-cyber-gray/50 border-cyber-blue/30 text-cyber-light"
                  />
                </div>
                {paymentScreenshot && (
                  <p className="text-green-400 text-sm">
                    ✓ Screenshot uploaded: {paymentScreenshot.name}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={() => setSelectedCrypto(null)}
                variant="outline"
                className="flex-1 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
              >
                Back to Selection
              </Button>
              <Button 
                onClick={handleSubmitPayment}
                className="flex-1 bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80"
                disabled={!paymentScreenshot || timeLeft === 0}
              >
                Submit Payment
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
