
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  Wallet, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Clock, 
  TrendingUp,
  Users,
  Activity,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  cartItems: number;
  totalSpent: number;
}

const Dashboard = () => {
  const { profile, isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    pendingOrders: 0,
    cartItems: 0,
    totalSpent: 0
  });

  const quickLinks = [
    {
      title: 'Premium Banklogs',
      description: 'High-balance verified accounts',
      href: '/dashboard/premium-banklogs',
      icon: CreditCard,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'CC Linkable',
      description: 'Credit card accounts',
      href: '/dashboard/cc-linkable',
      icon: CreditCard,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'PayPal Logs',
      description: 'Verified PayPal accounts',
      href: '/dashboard/paypal-logs',
      icon: Wallet,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      title: 'CashApp Logs',
      description: 'CashApp verified balances',
      href: '/dashboard/cashapp-logs',
      icon: DollarSign,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    },
    {
      title: 'Tools',
      description: 'Professional security tools',
      href: '/dashboard/tools',
      icon: Package,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    },
    {
      title: 'My Cart',
      description: 'Review your selections',
      href: '/dashboard/cart',
      icon: ShoppingCart,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/20'
    }
  ];

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch user's orders
      const { data: orders } = await supabase
        .from('orders')
        .select('total, status')
        .eq('user_id', profile?.id);

      // Fetch cart items
      const { data: cartItems } = await supabase
        .from('cart')
        .select('quantity')
        .eq('user_id', profile?.id);

      const totalOrders = orders?.length || 0;
      const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;
      const totalSpent = orders?.filter(o => o.status === 'completed').reduce((sum, o) => sum + Number(o.total), 0) || 0;
      const cartItemsCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

      setStats({
        totalOrders,
        pendingOrders,
        cartItems: cartItemsCount,
        totalSpent
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  return (
    <DashboardLayout title="Dashboard">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-cyber text-cyber-blue">
            Welcome back, {profile?.username}!
          </h2>
          <div className="flex justify-center items-center gap-4">
            <Badge variant="outline" className="border-cyber-blue/30 text-cyber-blue px-4 py-2">
              Tier: {profile?.tier}
            </Badge>
            <Badge variant="outline" className={`px-4 py-2 ${
              isAdmin() 
                ? 'border-purple-500/30 text-purple-400' 
                : 'border-green-500/30 text-green-400'
            }`}>
              Role: {profile?.role}
            </Badge>
          </div>
          
          {/* Admin Portal Button */}
          {isAdmin() && (
            <div className="mt-6">
              <Link to="/admin">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-tech">
                  <Shield className="h-4 w-4 mr-2" />
                  Access Admin Portal
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-cyber-darker/60 border-cyber-blue/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyber-light/60 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-cyber-blue">{stats.totalOrders}</p>
                </div>
                <Clock className="h-8 w-8 text-cyber-blue" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cyber-darker/60 border-cyber-blue/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyber-light/60 text-sm">Pending Orders</p>
                  <p className="text-2xl font-bold text-orange-400">{stats.pendingOrders}</p>
                </div>
                <Activity className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cyber-darker/60 border-cyber-blue/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyber-light/60 text-sm">Cart Items</p>
                  <p className="text-2xl font-bold text-green-400">{stats.cartItems}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cyber-darker/60 border-cyber-blue/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyber-light/60 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-purple-400">${stats.totalSpent.toFixed(2)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-cyber text-cyber-light mb-6">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={link.href}>
                  <Card className="bg-cyber-darker/60 border-cyber-blue/30 hover:border-cyber-blue/60 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg ${link.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <link.icon className={`h-6 w-6 ${link.color}`} />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-cyber-light group-hover:text-cyber-blue transition-colors">
                            {link.title}
                          </h4>
                          <p className="text-cyber-light/60 text-sm">
                            {link.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-cyber-darker/60 border-cyber-blue/30">
          <CardHeader>
            <CardTitle className="text-cyber-light font-tech">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-cyber-light/40 mx-auto mb-4" />
              <p className="text-cyber-light/60">Your recent orders and activities will appear here</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
