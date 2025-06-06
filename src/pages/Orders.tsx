
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Order {
  id: string;
  items: any[];
  total: number;
  status: string;
  created_at: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'processing': return 'bg-blue-500/20 text-blue-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient pt-20 flex items-center justify-center">
        <div className="text-cyber-blue text-xl">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-gradient pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
              Your Orders
            </h1>
            <p className="text-xl text-cyber-light/70">
              Track your purchase history and order status
            </p>
          </div>

          {orders.length === 0 ? (
            <Card className="bg-cyber-darker/60 border-cyber-blue/30 text-center py-12">
              <CardContent>
                <Package className="h-16 w-16 text-cyber-blue/50 mx-auto mb-4" />
                <h2 className="text-2xl font-cyber text-cyber-light mb-4">No orders yet</h2>
                <p className="text-cyber-light/70">
                  When you place your first order, it will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="bg-cyber-darker/60 border-cyber-blue/30">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-cyber-light font-tech">
                            Order #{order.id.slice(0, 8)}
                          </CardTitle>
                          <p className="text-cyber-light/60 text-sm">
                            Placed on {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-cyber-light font-medium mb-2">Items:</h4>
                          <div className="space-y-2">
                            {order.items.map((item: any, itemIndex: number) => (
                              <div key={itemIndex} className="flex justify-between items-center p-3 bg-cyber-gray/20 rounded-lg">
                                <div>
                                  <span className="text-cyber-light">{item.name}</span>
                                  <span className="text-cyber-light/60 text-sm ml-2">
                                    x{item.quantity}
                                  </span>
                                </div>
                                <span className="text-green-400 font-bold">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="border-t border-cyber-blue/20 pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-cyber-light font-bold">Total:</span>
                            <span className="text-green-400 text-xl font-bold">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;
