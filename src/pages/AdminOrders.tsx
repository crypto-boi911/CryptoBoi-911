
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Clock, CheckCircle, XCircle, Eye, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  user: string;
  items: string[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paymentMethod: string;
  createdAt: string;
  category: string;
}

const AdminOrders = () => {
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: 'ORD-001', 
      user: 'john_doe', 
      items: ['Chase Bank Log', 'PayPal Business'], 
      total: 1250, 
      status: 'completed', 
      paymentMethod: 'Bitcoin',
      createdAt: '2024-06-04 14:30',
      category: 'Bank Logs'
    },
    { 
      id: 'ORD-002', 
      user: 'alice_smith', 
      items: ['Visa Platinum Card'], 
      total: 65, 
      status: 'processing', 
      paymentMethod: 'Ethereum',
      createdAt: '2024-06-04 13:15',
      category: 'Cards'
    },
    { 
      id: 'ORD-003', 
      user: 'bob_wilson', 
      items: ['CashApp Premium Log', 'Wells Fargo Log'], 
      total: 520, 
      status: 'pending', 
      paymentMethod: 'USDT',
      createdAt: '2024-06-04 12:45',
      category: 'CashApp Logs'
    },
    { 
      id: 'ORD-004', 
      user: 'sarah_jones', 
      items: ['Bank of America Log'], 
      total: 320, 
      status: 'failed', 
      paymentMethod: 'Bitcoin',
      createdAt: '2024-06-04 11:20',
      category: 'Bank Logs'
    },
    { 
      id: 'ORD-005', 
      user: 'mike_chen', 
      items: ['PayPal Business Premium'], 
      total: 180, 
      status: 'completed', 
      paymentMethod: 'Bitcoin',
      createdAt: '2024-06-04 10:15',
      category: 'PayPal Logs'
    },
    { 
      id: 'ORD-006', 
      user: 'lisa_wong', 
      items: ['Mastercard Gold Card', 'Visa Virtual Card'], 
      total: 135, 
      status: 'processing', 
      paymentMethod: 'Ethereum',
      createdAt: '2024-06-04 09:30',
      category: 'Cards'
    },
  ]);

  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    // Log admin access to orders page
    const adminLogs = JSON.parse(localStorage.getItem('adminActivityLogs') || '[]');
    adminLogs.push({
      id: crypto.randomUUID(),
      action: 'ORDERS_VIEW',
      timestamp: new Date().toISOString(),
      details: 'Admin accessed orders management page',
      sessionId: JSON.parse(localStorage.getItem('adminSession') || '{}').sessionId
    });
    localStorage.setItem('adminActivityLogs', JSON.stringify(adminLogs));

    // Load recent activity
    setRecentActivity(adminLogs.slice(-5).reverse());
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    // Log admin action
    const adminLogs = JSON.parse(localStorage.getItem('adminActivityLogs') || '[]');
    adminLogs.push({
      id: crypto.randomUUID(),
      action: 'ORDER_STATUS_UPDATE',
      timestamp: new Date().toISOString(),
      details: `Updated order ${orderId} status to ${newStatus}`,
      sessionId: JSON.parse(localStorage.getItem('adminSession') || '{}').sessionId
    });
    localStorage.setItem('adminActivityLogs', JSON.stringify(adminLogs));
    
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'processing': return 'bg-blue-500/20 text-blue-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
    }
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
    failed: orders.filter(o => o.status === 'failed').length,
    totalRevenue: orders.filter(o => o.status === 'completed').reduce((sum, order) => sum + order.total, 0),
    avgOrderValue: Math.round(orders.reduce((sum, order) => sum + order.total, 0) / orders.length)
  };

  return (
    <div className="min-h-screen bg-cyber-gradient pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link to="/admin/dashboard" className="text-cyber-blue hover:text-cyber-blue/80 mb-4 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
                Order Management
              </h1>
              <p className="text-xl text-cyber-light/70">
                Monitor and manage all customer orders across all product categories
              </p>
            </div>
          </div>

          {/* Enhanced Order Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-cyber-blue">{orderStats.total}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-cyber-blue" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-yellow-400">{orderStats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Processing</p>
                    <p className="text-2xl font-bold text-blue-400">{orderStats.processing}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-green-400">{orderStats.completed}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-green-400">${orderStats.totalRevenue}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Avg Order</p>
                    <p className="text-2xl font-bold text-purple-400">${orderStats.avgOrderValue}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
            <CardHeader>
              <CardTitle className="text-cyber-light font-tech">All Orders • Real-time Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-cyber-blue/20">
                      <TableHead className="text-cyber-light">Order ID</TableHead>
                      <TableHead className="text-cyber-light">User</TableHead>
                      <TableHead className="text-cyber-light">Items</TableHead>
                      <TableHead className="text-cyber-light">Category</TableHead>
                      <TableHead className="text-cyber-light">Total</TableHead>
                      <TableHead className="text-cyber-light">Payment</TableHead>
                      <TableHead className="text-cyber-light">Status</TableHead>
                      <TableHead className="text-cyber-light">Date</TableHead>
                      <TableHead className="text-cyber-light">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} className="border-cyber-blue/10">
                        <TableCell className="text-cyber-light font-mono">{order.id}</TableCell>
                        <TableCell className="text-cyber-light">{order.user}</TableCell>
                        <TableCell className="text-cyber-light/70">
                          {order.items.join(', ')}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-cyber-blue border-cyber-blue/30">
                            {order.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-green-400 font-bold">${order.total}</TableCell>
                        <TableCell className="text-cyber-blue">{order.paymentMethod}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              {order.status}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-cyber-light/70">{order.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <select 
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                              className="text-xs px-2 py-1 bg-cyber-gray/30 border border-cyber-blue/20 text-cyber-light rounded"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="completed">Completed</option>
                              <option value="failed">Failed</option>
                            </select>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminOrders;
