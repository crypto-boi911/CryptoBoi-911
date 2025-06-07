
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UserDashboardLayout from '@/components/UserDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Package, DollarSign } from 'lucide-react';

interface Order {
  id: string;
  total: number;
  status: string;
  payment_method: string;
  created_at: string;
  order_items: Array<{
    product_name: string;
    product_category: string;
    quantity: number;
    price: number;
  }>;
}

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            product_name,
            product_category,
            quantity,
            price
          )
        `)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <UserDashboardLayout title="Order History" showBackButton>
        <div className="flex items-center justify-center py-12">
          <div className="text-cyber-blue text-xl">Loading orders...</div>
        </div>
      </UserDashboardLayout>
    );
  }

  return (
    <UserDashboardLayout title="Order History" showBackButton>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-cyber-light/40 mx-auto mb-4" />
            <h3 className="text-xl text-cyber-light/60 mb-2">No orders yet</h3>
            <p className="text-cyber-light/40">Your order history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="bg-cyber-darker/60 border-cyber-blue/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-cyber-light font-tech">
                      Order #{order.id.slice(0, 8)}
                    </CardTitle>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-cyber-light/60">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(order.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-cyber-blue">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold">${order.total}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-cyber-light font-medium">Items:</h4>
                    {order.order_items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm bg-cyber-dark/30 p-2 rounded">
                        <span className="text-cyber-light">{item.product_name}</span>
                        <div className="text-cyber-light/60">
                          {item.quantity}x ${item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </UserDashboardLayout>
  );
};

export default OrderHistory;
