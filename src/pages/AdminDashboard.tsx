
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Settings, Activity, LogOut, Package, FileText, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdminAuthenticated');
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin dashboard",
    });
    navigate('/admin/login');
  };

  const dashboardItems = [
    {
      title: 'User Management',
      description: 'View all user login credentials and access codes',
      icon: Users,
      path: '/admin/users',
      color: 'text-blue-500'
    },
    {
      title: 'Product Management',
      description: 'Manage all dashboard products and inventory',
      icon: Package,
      path: '/admin/products',
      color: 'text-green-500'
    },
    {
      title: 'Order Management',
      description: 'Monitor and manage customer orders',
      icon: ShoppingCart,
      path: '/admin/orders',
      color: 'text-purple-500'
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
      description: 'Monitor system activity and user actions',
      icon: Activity,
      path: '/admin/logs',
      color: 'text-orange-500'
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
                Complete management portal for all site operations
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

          {/* Quick Stats */}
          <div className="mt-12">
            <h2 className="text-2xl font-cyber font-bold text-cyber-light mb-6">Quick Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyber-light/60 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-cyber-blue">156</p>
                    </div>
                    <Users className="h-8 w-8 text-cyber-blue" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyber-light/60 text-sm">Active Products</p>
                      <p className="text-2xl font-bold text-green-400">42</p>
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
                      <p className="text-2xl font-bold text-purple-400">8</p>
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
                      <p className="text-2xl font-bold text-green-400">$12,450</p>
                    </div>
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 font-bold">$</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
