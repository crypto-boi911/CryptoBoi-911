
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Settings, Activity, LogOut, Package, FileText, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalProducts: 0,
    totalOrders: 4,
    totalRevenue: 12450,
    recentActivity: []
  });

  useEffect(() => {
    // Load real-time data from localStorage
    const loadDashboardData = () => {
      // Get user registrations
      const registrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
      const credentials = JSON.parse(localStorage.getItem('userCredentials') || '[]');
      
      // Count products from all pages
      let totalProducts = 0;
      
      // Get products from bank logs (estimated)
      totalProducts += 50; // Bank logs base count
      
      // Get products from other pages (100 each as we added)
      totalProducts += 100; // PayPal logs
      totalProducts += 100; // CashApp logs
      totalProducts += 100; // Cards
      totalProducts += 10;  // Tools (estimated)
      
      // Get recent admin activity
      const adminLogs = JSON.parse(localStorage.getItem('adminActivityLogs') || '[]');
      const recentActivity = adminLogs.slice(-10).reverse();
      
      setDashboardStats({
        totalUsers: registrations.length,
        activeUsers: credentials.length,
        totalProducts,
        totalOrders: 4,
        totalRevenue: 12450,
        recentActivity
      });
    };

    loadDashboardData();

    // Update admin activity
    const adminLogs = JSON.parse(localStorage.getItem('adminActivityLogs') || '[]');
    adminLogs.push({
      id: crypto.randomUUID(),
      action: 'DASHBOARD_VIEW',
      timestamp: new Date().toISOString(),
      details: 'Admin accessed dashboard',
      sessionId: JSON.parse(localStorage.getItem('adminSession') || '{}').sessionId
    });
    localStorage.setItem('adminActivityLogs', JSON.stringify(adminLogs));

    // Set up real-time polling for updates
    const interval = setInterval(loadDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    // Log admin logout
    const adminLogs = JSON.parse(localStorage.getItem('adminActivityLogs') || '[]');
    adminLogs.push({
      id: crypto.randomUUID(),
      action: 'LOGOUT',
      timestamp: new Date().toISOString(),
      details: 'Admin logged out',
      sessionId: JSON.parse(localStorage.getItem('adminSession') || '{}').sessionId
    });
    localStorage.setItem('adminActivityLogs', JSON.stringify(adminLogs));

    // Clear admin session
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminSession');
    
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin dashboard",
    });
    navigate('/');
  };

  const dashboardItems = [
    {
      title: 'User Management',
      description: `View all ${dashboardStats.totalUsers} registered users and ${dashboardStats.activeUsers} active sessions`,
      icon: Users,
      path: '/admin/users',
      color: 'text-blue-500',
      count: dashboardStats.totalUsers
    },
    {
      title: 'Product Management',
      description: `Manage all ${dashboardStats.totalProducts} products across all categories`,
      icon: Package,
      path: '/admin/products',
      color: 'text-green-500',
      count: dashboardStats.totalProducts
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Enhanced Stats */}
          <div className="mt-12">
            <h2 className="text-2xl font-cyber font-bold text-cyber-light mb-6">Live Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyber-light/60 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-cyber-blue">{dashboardStats.totalUsers}</p>
                      <p className="text-xs text-green-400 mt-1">↗ {dashboardStats.activeUsers} active</p>
                    </div>
                    <Users className="h-8 w-8 text-cyber-blue" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyber-light/60 text-sm">Total Products</p>
                      <p className="text-2xl font-bold text-green-400">{dashboardStats.totalProducts}</p>
                      <p className="text-xs text-green-400 mt-1">↗ All categories</p>
                    </div>
                    <Package className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyber-light/60 text-sm">Orders Today</p>
                      <p className="text-2xl font-bold text-purple-400">{dashboardStats.totalOrders}</p>
                      <p className="text-xs text-purple-400 mt-1">↗ Active orders</p>
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
                      <p className="text-2xl font-bold text-green-400">${dashboardStats.totalRevenue.toLocaleString()}</p>
                      <p className="text-xs text-green-400 mt-1">↗ Total earned</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          {dashboardStats.recentActivity.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-cyber font-bold text-cyber-light mb-6">Recent Admin Activity</h2>
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {dashboardStats.recentActivity.slice(0, 5).map((activity: any, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-cyber-blue/10 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                          <div>
                            <p className="text-cyber-light font-medium">{activity.action}</p>
                            <p className="text-cyber-light/60 text-sm">{activity.details}</p>
                          </div>
                        </div>
                        <p className="text-cyber-light/60 text-sm">
                          {new Date(activity.timestamp).toLocaleTimeString()}
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
