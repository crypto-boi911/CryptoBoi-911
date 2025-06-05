
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Settings, Activity, LogOut, Package, FileText, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeOrders: number;
  recentActivity: any[];
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    recentActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check admin access
  useEffect(() => {
    if (profile && profile.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive"
      });
      navigate('/dashboard');
      return;
    }
  }, [profile, navigate, toast]);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user || profile?.role !== 'admin') return;
      
      try {
        // Get total users
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Get total orders and revenue
        const { data: orders } = await supabase
          .from('orders')
          .select('total, status, created_at');

        const totalOrders = orders?.length || 0;
        const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total), 0) || 0;
        const activeOrders = orders?.filter(order => order.status === 'pending' || order.status === 'processing').length || 0;

        // Get recent activity
        const { data: recentActivity } = await supabase
          .from('user_activity')
          .select('*, profiles!inner(username)')
          .order('created_at', { ascending: false })
          .limit(10);

        setDashboardStats({
          totalUsers: userCount || 0,
          totalOrders,
          totalRevenue,
          activeOrders,
          recentActivity: recentActivity || []
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user && profile?.role === 'admin') {
      loadDashboardData();
    }
  }, [user, profile, toast]);

  // Set up real-time subscriptions for live updates
  useEffect(() => {
    if (!user || profile?.role !== 'admin') return;

    // Subscribe to profiles changes
    const profilesChannel = supabase
      .channel('profiles-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        console.log('Profiles updated');
        // Reload data when profiles change
        loadDashboardData();
      })
      .subscribe();

    // Subscribe to orders changes
    const ordersChannel = supabase
      .channel('orders-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        console.log('Orders updated');
        loadDashboardData();
      })
      .subscribe();

    // Subscribe to activity changes
    const activityChannel = supabase
      .channel('activity-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'user_activity' }, () => {
        console.log('New activity logged');
        loadDashboardData();
      })
      .subscribe();

    const loadDashboardData = async () => {
      try {
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        const { data: orders } = await supabase
          .from('orders')
          .select('total, status, created_at');

        const totalOrders = orders?.length || 0;
        const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total), 0) || 0;
        const activeOrders = orders?.filter(order => order.status === 'pending' || order.status === 'processing').length || 0;

        const { data: recentActivity } = await supabase
          .from('user_activity')
          .select('*, profiles!inner(username)')
          .order('created_at', { ascending: false })
          .limit(10);

        setDashboardStats({
          totalUsers: userCount || 0,
          totalOrders,
          totalRevenue,
          activeOrders,
          recentActivity: recentActivity || []
        });
      } catch (error) {
        console.error('Error reloading dashboard data:', error);
      }
    };

    return () => {
      supabase.removeChannel(profilesChannel);
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(activityChannel);
    };
  }, [user, profile]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const dashboardItems = [
    {
      title: 'User Management',
      description: `View all ${dashboardStats.totalUsers} registered users and manage their accounts`,
      icon: Users,
      path: '/admin/users',
      color: 'text-blue-500',
      count: dashboardStats.totalUsers
    },
    {
      title: 'Product Management',
      description: 'Manage all products across all categories',
      icon: Package,
      path: '/admin/products',
      color: 'text-green-500',
      count: 360 // Static for demo
    },
    {
      title: 'Order Management',
      description: `Monitor and manage ${dashboardStats.totalOrders} customer orders`,
      icon: ShoppingCart,
      path: '/admin/orders',
      color: 'text-purple-500',
      count: dashboardStats.totalOrders
    },
    {
      title: 'Content Management',
      description: 'Manage announcements and site content',
      icon: FileText,
      path: '/admin/content',
      color: 'text-cyan-500'
    },
    {
      title: 'Messages',
      description: 'View and respond to contact messages',
      icon: MessageSquare,
      path: '/admin/messages',
      color: 'text-pink-500'
    },
    {
      title: 'Activity Logs',
      description: `Monitor system activity and user actions (${dashboardStats.recentActivity.length} recent)`,
      icon: Activity,
      path: '/admin/logs',
      color: 'text-orange-500',
      count: dashboardStats.recentActivity.length
    },
    {
      title: 'System Settings',
      description: 'Configure system settings and preferences',
      icon: Settings,
      path: '/admin/settings',
      color: 'text-gray-500'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
        <div className="text-cyber-light flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyber-blue"></div>
          Loading admin dashboard...
        </div>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
                Admin Dashboard
              </h1>
              <p className="text-xl text-cyber-light/70">
                Complete management portal for all site operations • Real-time monitoring
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500/30 text-red-500 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Live Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-cyber-blue">{dashboardStats.totalUsers}</p>
                    <p className="text-xs text-green-400 mt-1">↗ Live count</p>
                  </div>
                  <Users className="h-8 w-8 text-cyber-blue" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-purple-400">{dashboardStats.totalOrders}</p>
                    <p className="text-xs text-purple-400 mt-1">↗ {dashboardStats.activeOrders} active</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-green-400">${dashboardStats.totalRevenue.toFixed(2)}</p>
                    <p className="text-xs text-green-400 mt-1">↗ Total earned</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Active Orders</p>
                    <p className="text-2xl font-bold text-orange-400">{dashboardStats.activeOrders}</p>
                    <p className="text-xs text-orange-400 mt-1">↗ Processing</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dashboardItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={item.path}>
                  <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg bg-cyber-blue/20 flex items-center justify-center">
                            <item.icon className={`h-6 w-6 ${item.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-cyber-light font-tech">
                              {item.title}
                            </CardTitle>
                          </div>
                        </div>
                        {item.count !== undefined && (
                          <div className="text-2xl font-bold text-cyber-blue">
                            {item.count}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-cyber-light/60">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          {dashboardStats.recentActivity.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-cyber font-bold text-cyber-light mb-6">Live Activity Feed</h2>
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {dashboardStats.recentActivity.slice(0, 8).map((activity: any, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-cyber-blue/10 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
                          <div>
                            <p className="text-cyber-light font-medium">
                              {activity.profiles?.username || 'Unknown User'} • {activity.action}
                            </p>
                            <p className="text-cyber-light/60 text-sm">
                              {activity.details ? JSON.stringify(activity.details).slice(0, 50) + '...' : 'No details'}
                            </p>
                          </div>
                        </div>
                        <p className="text-cyber-light/60 text-sm">
                          {new Date(activity.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
