
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingCart, Settings, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  created_at: string;
}

interface Order {
  id: string;
  user_id: string;
  items: any[];
  total: number;
  status: string;
  created_at: string;
  user_email?: string;
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const { signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch users
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      } else {
        setUsers(profiles || []);
      }

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
      } else {
        setOrders(ordersData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingOrder(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders =>
        orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast({
        title: "Order Updated",
        description: `Order status changed to ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdatingOrder(null);
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

  const totalRevenue = orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient pt-20 flex items-center justify-center">
        <div className="text-cyber-blue text-xl">Loading admin panel...</div>
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
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
                Admin Dashboard
              </h1>
              <p className="text-xl text-cyber-light/70">
                Manage users, orders, and system settings
              </p>
            </div>
            <Button
              onClick={signOut}
              variant="outline"
              className="border-red-500/30 text-red-500 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-cyber-darker/60 border-cyber-blue/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-cyber-blue">{users.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-cyber-blue" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-darker/60 border-cyber-blue/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-purple-400">{orders.length}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-darker/60 border-cyber-blue/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-green-400">${totalRevenue.toFixed(2)}</p>
                  </div>
                  <Package className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-darker/60 border-cyber-blue/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Pending Orders</p>
                    <p className="text-2xl font-bold text-orange-400">
                      {orders.filter(o => o.status === 'pending').length}
                    </p>
                  </div>
                  <Settings className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Table */}
          <Card className="bg-cyber-darker/60 border-cyber-blue/30 mb-8">
            <CardHeader>
              <CardTitle className="text-cyber-light font-tech">Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-cyber-blue/20">
                    <TableHead className="text-cyber-light">Username</TableHead>
                    <TableHead className="text-cyber-light">Role</TableHead>
                    <TableHead className="text-cyber-light">Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-cyber-blue/10">
                      <TableCell className="text-cyber-light">{user.username}</TableCell>
                      <TableCell>
                        <Badge className={user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-cyber-light/70">
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card className="bg-cyber-darker/60 border-cyber-blue/30">
            <CardHeader>
              <CardTitle className="text-cyber-light font-tech">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-cyber-blue/20">
                    <TableHead className="text-cyber-light">Order ID</TableHead>
                    <TableHead className="text-cyber-light">Items</TableHead>
                    <TableHead className="text-cyber-light">Total</TableHead>
                    <TableHead className="text-cyber-light">Status</TableHead>
                    <TableHead className="text-cyber-light">Date</TableHead>
                    <TableHead className="text-cyber-light">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="border-cyber-blue/10">
                      <TableCell className="text-cyber-light font-mono">
                        #{order.id.slice(0, 8)}
                      </TableCell>
                      <TableCell className="text-cyber-light/70">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </TableCell>
                      <TableCell className="text-green-400 font-bold">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-cyber-light/70">
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) => updateOrderStatus(order.id, value)}
                          disabled={updatingOrder === order.id}
                        >
                          <SelectTrigger className="w-32 bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-cyber-darker border-cyber-blue/20">
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
