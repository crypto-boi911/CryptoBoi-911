
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CryptoPaymentProps {
  orderId: string;
  amount: number;
  onPaymentConfirmed: () => void;
  onCancel: () => void;
}

interface Payment {
  id: string;
  payment_id: string;
  pay_address: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

const CryptoPayment: React.FC<CryptoPaymentProps> = ({ 
  orderId, 
  amount, 
  onPaymentConfirmed, 
  onCancel 
}) => {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    createPayment();
  }, []);

  useEffect(() => {
    if (payment && payment.status === 'waiting') {
      setIsPolling(true);
      const interval = setInterval(() => {
        checkPaymentStatus();
      }, 15000); // Check every 15 seconds

      return () => clearInterval(interval);
    }
  }, [payment]);

  useEffect(() => {
    if (timeLeft > 0 && payment) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      toast({
        title: "Payment Expired",
        description: "Payment session has expired. Please create a new payment.",
        variant: "destructive",
      });
    }
  }, [timeLeft, payment]);

  const createPayment = async () => {
    setIsCreating(true);
    setError(null);
    
    try {
      // Validate amount
      const numericAmount = parseFloat(amount.toString());
      if (isNaN(numericAmount) || numericAmount <= 0) {
        throw new Error('Invalid payment amount');
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      console.log('Creating payment with data:', { orderId, amount: numericAmount, currency: 'usdt' });

      const response = await fetch('/functions/v1/create-crypto-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          orderId,
          amount: numericAmount,
          currency: 'usdt'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Payment creation failed:', errorData);
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const paymentData = await response.json();
      console.log('Payment created successfully:', paymentData);
      
      setPayment(paymentData);
      
      toast({
        title: "Payment Created",
        description: "Please send the exact amount to the provided address",
      });
    } catch (error: any) {
      console.error('Payment creation error:', error);
      setError(error.message);
      toast({
        title: "Payment Creation Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (!payment) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/functions/v1/check-payment-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          paymentId: payment.payment_id
        }),
      });

      if (response.ok) {
        const statusData = await response.json();
        console.log('Payment status check:', statusData);
        
        setPayment(prev => prev ? { ...prev, status: statusData.status } : null);

        if (statusData.status === 'confirmed' || statusData.status === 'finished') {
          setIsPolling(false);
          toast({
            title: "Payment Confirmed!",
            description: "Your payment has been successfully processed",
          });
          onPaymentConfirmed();
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  const copyAddress = async () => {
    if (!payment) return;
    
    try {
      await navigator.clipboard.writeText(payment.pay_address);
      toast({
        title: "Address Copied",
        description: "Payment address copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-500/20 text-yellow-400';
      case 'confirming': return 'bg-blue-500/20 text-blue-400';
      case 'confirmed': return 'bg-green-500/20 text-green-400';
      case 'finished': return 'bg-green-500/20 text-green-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
      case 'expired': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'finished':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed':
      case 'expired':
        return <XCircle className="h-4 w-4" />;
      case 'confirming':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (isCreating) {
    return (
      <div className="min-h-screen bg-cyber-gradient pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-cyber-blue text-xl mb-4">Creating crypto payment...</div>
          <div className="text-cyber-light/60">Please wait while we generate your payment address</div>
        </div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="min-h-screen bg-cyber-gradient pt-20 flex items-center justify-center">
        <Card className="bg-cyber-darker/60 border-red-500/30 max-w-md mx-4">
          <CardContent className="p-6 text-center">
            <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-cyber text-red-400 mb-2">Payment Creation Failed</h2>
            <p className="text-cyber-light/70 mb-4">{error || 'Unknown error occurred'}</p>
            <div className="flex gap-2">
              <Button 
                onClick={createPayment}
                className="flex-1 bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80"
                disabled={isCreating}
              >
                Try Again
              </Button>
              <Button 
                onClick={onCancel}
                variant="outline"
                className="flex-1 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-gradient pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-cyber font-bold text-cyber-blue mb-4">
            Crypto Payment
          </h1>
          <p className="text-cyber-light/70">
            Send the exact amount to complete your order
          </p>
        </div>

        {/* Timer */}
        <Card className="bg-red-500/20 border-red-500/30 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 text-red-400">
              <Clock className="h-5 w-5" />
              <span className="font-tech text-lg">
                Time remaining: {formatTime(timeLeft)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card className="bg-cyber-darker/60 border-cyber-blue/30 mb-6">
          <CardHeader>
            <CardTitle className="text-cyber-light font-tech flex items-center gap-2">
              Payment Status
              <Badge className={getStatusColor(payment.status)}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(payment.status)}
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </div>
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {payment.status === 'waiting' && (
              <p className="text-cyber-light/70">
                Waiting for payment confirmation...
                {isPolling && " (Checking status automatically)"}
              </p>
            )}
            {payment.status === 'confirming' && (
              <p className="text-blue-400">
                Payment detected! Waiting for blockchain confirmations...
              </p>
            )}
            {(payment.status === 'confirmed' || payment.status === 'finished') && (
              <p className="text-green-400">
                Payment confirmed! Your order has been processed.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card className="bg-cyber-darker/60 border-cyber-blue/30 mb-6">
          <CardHeader>
            <CardTitle className="text-cyber-light font-tech">Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-cyber-light/60">Amount:</span>
                <p className="text-green-400 font-bold text-xl">
                  {payment.amount} {payment.currency.toUpperCase()}
                </p>
              </div>
              <div>
                <span className="text-cyber-light/60">Currency:</span>
                <p className="text-cyber-light font-bold">{payment.currency.toUpperCase()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-cyber-light/60">Payment Address:</span>
              <div className="flex gap-2">
                <div className="flex-1 p-3 bg-cyber-gray/30 rounded border border-cyber-blue/20 font-mono text-sm break-all">
                  {payment.pay_address}
                </div>
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

            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded p-4">
              <p className="text-yellow-400 text-sm">
                <strong>Important:</strong> Send exactly {payment.amount} {payment.currency.toUpperCase()} to the address above. 
                Sending a different amount may result in payment failure.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
          >
            Cancel Payment
          </Button>
          <Button
            onClick={checkPaymentStatus}
            className="flex-1 bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80"
            disabled={payment.status !== 'waiting' && payment.status !== 'confirming'}
          >
            Check Status
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CryptoPayment;
