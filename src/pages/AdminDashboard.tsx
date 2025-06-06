
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Settings, Activity, LogOut, Package, FileText, ShoppingCart, TrendingUp, DollarSign, Bell, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeOrders: number;
  recentActivity: any[];
}

interface RealtimeActivity {
  id: string;
  user_id: string;
  action: string;
  details: any;
  created_at: string;
  username?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    recentActivity: []
  });
  const [realtimeActivities, setRealtimeActivities] = useState<RealtimeActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    setupRealtimeSubscriptions();
    
    return () => {
      // Cleanup subscriptions
      supabase.removeAllChannels();
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch users count
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch orders data
      const { data: orders } = await supabase
        .from('orders')
        .select('total, status');

      // Fetch recent activity
      const { data: activities } = await supabase
        .from('user_activity')
        .select(`
          *,
          profiles!user_activity_user_id_fkey(username)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      const totalOrders = orders?.length || 0;
      const totalRevenue = orders?.filter(o => o.status === 'completed')
        .reduce((sum, order) => sum + Number(order.total), 0) || 0;
      const activeOrders = orders?.filter(o => o.status === 'pending' || o.status === 'processing').length || 0;

      setDashboardStats({
        totalUsers: usersCount || 0,
        totalOrders,
        totalRevenue,
        activeOrders,
        recentActivity: activities || []
      });

      // Set initial activities for realtime display
      if (activities) {
        setRealtimeActivities(activities.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    // Subscribe to user activity changes
    const activityChannel = supabase
      .channel('admin-activity-monitor')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_activity'
        },
        async (payload) => {
          console.log('New activity detected:', payload);
          
          // Fetch user details for the activity
          const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', payload.new.user_id)
            .single();

          const newActivity = {
            ...payload.new,
            username: profile?.username || 'Unknown User'
          } as RealtimeActivity;

          setRealtimeActivities(prev => [newActivity, ...prev.slice(0, 4)]);
        }
      )
      .subscribe();

    // Subscribe to new user registrations
    const usersChannel = supabase
      .channel('admin-users-monitor')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          console.log('New user registered:', payload);
          setDashboardStats(prev => ({
            ...prev,
            totalUsers: prev.totalUsers + 1
          }));
        }
      )
      .subscribe();

    // Subscribe to new orders
    const ordersChannel = supabase
      .channel('admin-orders-monitor')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('New order created:', payload);
          setDashboardStats(prev => ({
            ...prev,
            totalOrders: prev.totalOrders + 1,
            activeOrders: prev.activeOrders + 1
          }));
        }
      )
      .subscribe();
  };

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
      color: 'text-green-500'
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
      title: 'Support Tickets',
      description: 'Manage customer support tickets and responses',
      icon: MessageSquare,
      path: '/admin/tickets',
      color: 'text-pink-500'
    },
    {
      title: 'Activity Monitor',
      description: `Real-time user activity monitoring (${realtimeActivities.length} recent)`,
      icon: Activity,
      path: '/admin/logs',
      color: 'text-orange-500',
      count: realtimeActivities.length
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
        <div className="text-cyber-blue text-xl">Loading admin dashboard...</div>
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
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xl text-cyber-light/70">
                  Live monitoring active • Real-time updates enabled
                </p>
              </div>
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
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <p className="text-xs text-green-400">Live</p>
                    </div>
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
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <p className="text-xs text-green-400">Live</p>
                    </div>
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
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <p className="text-xs text-green-400">Live</p>
                    </div>
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
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <p className="text-xs text-green-400">Live</p>
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Live Activity Feed */}
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-cyber-blue" />
                  <CardTitle className="text-cyber-light font-tech">Live Activity</CardTitle>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <CardDescription className="text-cyber-light/60">
                  Real-time user activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 max-h-80 overflow-y-auto">
                {realtimeActivities.length === 0 ? (
                  <p className="text-cyber-light/40 text-center py-4">No recent activity</p>
                ) : (
                  realtimeActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-cyber-dark/30 rounded-lg">
                      <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-cyber-light text-sm">
                          <span className="font-medium">{activity.username}</span> {activity.action}
                        </p>
                        <p className="text-cyber-light/60 text-xs">
                          {new Date(activity.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
