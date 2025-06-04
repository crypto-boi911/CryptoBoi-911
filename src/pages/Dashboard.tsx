import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  CreditCard, 
  Database, 
  Smartphone, 
  Wrench, 
  ShoppingCart, 
  ClipboardList, 
  LogOut 
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';

const Dashboard = () => {
  const [username, setUsername] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get the stored username from when they registered
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      const credentials = JSON.parse(storedCredentials);
      if (credentials.length > 0) {
        // Get the most recent user (last in array)
        const recentUser = credentials[credentials.length - 1];
        setUsername(recentUser.username);
      }
    }
    
    // Fallback: if no stored credentials, use a default
    if (!username) {
      setUsername('User');
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate('/login');
  };

  const sidebarItems = [
    { name: 'Home', icon: Home, path: '/dashboard', active: true },
    { name: 'Bank Logs', icon: CreditCard, path: '/dashboard/bank-logs' },
    { name: 'Cards/Linkables', icon: CreditCard, path: '/dashboard/cards' },
    { name: 'PayPal Logs', icon: Database, path: '/dashboard/paypal' },
    { name: 'CashApp Logs', icon: Smartphone, path: '/dashboard/cashapp' },
    { name: 'Tools', icon: Wrench, path: '/dashboard/tools' },
    { name: 'Cart', icon: ShoppingCart, path: '/dashboard/cart' },
    { name: 'Orders', icon: ClipboardList, path: '/dashboard/orders' },
  ];

  const productCategories = [
    { name: 'Bank Logs', description: 'Premium bank account credentials', color: 'bg-gradient-to-r from-purple-500 to-blue-500' },
    { name: 'PayPal Logs', description: 'Verified PayPal account access', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { name: 'CashApp Logs', description: 'Mobile payment platform logs', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { name: 'Cards/Linkables', description: 'Credit card and linkable accounts', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
  ];

  const features = [
    {
      title: 'Fast & Secure',
      description: 'Your data is secure with us. We ensure fast log purchase and secure access.',
      icon: '🔒'
    },
    {
      title: 'Customizable Options',
      description: 'Tailor logs to meet your specific needs, with a variety of categories.',
      icon: '⚙️'
    },
    {
      title: 'User-Friendly',
      description: 'Enjoy an intuitive dashboard that\'s easy to navigate and operate.',
      icon: '👤'
    },
    {
      title: '24/7 Support',
      description: 'Get support anytime you need it with our reliable customer service.',
      icon: '🛟'
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-cyber-gradient flex w-full">
        <AppSidebar sidebarItems={sidebarItems} onLogout={handleLogout} />
        
        <SidebarInset className="flex-1">
          {/* Header with Sidebar Toggle */}
          <header className="bg-cyber-darker/50 border-b border-cyber-blue/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="
                  bg-cyber-blue/20 
                  border-2 
                  border-cyber-blue 
                  text-cyber-blue 
                  hover:bg-cyber-blue 
                  hover:text-cyber-dark 
                  transition-all 
                  duration-300 
                  w-12 
                  h-12 
                  rounded-lg 
                  shadow-lg 
                  shadow-cyber-blue/30
                  hover:shadow-cyber-blue/50
                  hover:scale-105
                  active:scale-95
                " />
                <div>
                  <h1 className="text-2xl font-cyber font-bold text-cyber-light mb-2">
                    Welcome back, {username}!
                  </h1>
                  <p className="text-cyber-light/60">
                    Purchase your logs with ease! The following categories are available.
                  </p>
                </div>
              </div>
              <div className="text-cyber-light/70 font-tech">
                Welcome {username}
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Product Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {productCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group cursor-pointer"
                  >
                    <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300 h-full">
                      <CardContent className="p-6">
                        <div className={`h-16 w-16 rounded-lg ${category.color} mb-4 flex items-center justify-center`}>
                          <CreditCard className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-tech font-semibold text-cyber-light mb-2">
                          {category.name}
                        </h3>
                        <p className="text-cyber-light/60 text-sm">
                          {category.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Why Choose Our Platform */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-cyber font-bold text-cyber-light mb-8 text-center">
                  Why Choose Our Platform?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    >
                      <Card className="glow-box bg-cyber-gray/30 border-cyber-blue/20 h-full">
                        <CardContent className="p-6 text-center">
                          <div className="text-4xl mb-4">{feature.icon}</div>
                          <h3 className="text-xl font-tech font-semibold text-cyber-light mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-cyber-light/60 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = ({ sidebarItems, onLogout }: { sidebarItems: any[], onLogout: () => void }) => {
  const location = useLocation();
  const { state } = useSidebar();

  return (
    <Sidebar className="bg-cyber-darker/90 border-r border-cyber-blue/20">
      <SidebarHeader className="p-6 border-b border-cyber-blue/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-cyber-blue rounded-lg flex items-center justify-center">
            <span className="text-cyber-dark font-bold">C</span>
          </div>
          {state === 'expanded' && (
            <span className="text-xl font-cyber font-bold text-cyber-blue">CYBERKRYPT</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {sidebarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard')}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard')
                        ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                        : 'text-cyber-light/70 hover:bg-cyber-blue/10 hover:text-cyber-blue'
                    }`}
                  >
                    <Link to={item.path} className="flex items-center space-x-3 w-full">
                      <item.icon className="h-5 w-5" />
                      <span className="font-tech">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-cyber-blue/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all w-full"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-tech">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Dashboard;
