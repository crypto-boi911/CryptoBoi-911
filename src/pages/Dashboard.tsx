import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  CreditCard, 
  Database, 
  Smartphone, 
  Wrench, 
  ShoppingCart, 
  ClipboardList, 
  HelpCircle,
  LogOut,
  Lock,
  Settings,
  User,
  LifeBuoy
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
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
import UserTierSystem from '@/components/UserTierSystem';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const username = user?.user_metadata?.username || 'User';

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  const sidebarItems = [
    { name: 'Bank Logs', icon: CreditCard, path: '/dashboard/bank-logs' },
    { name: 'Cards/Linkables', icon: CreditCard, path: '/dashboard/cards' },
    { name: 'PayPal Logs', icon: Database, path: '/dashboard/paypal' },
    { name: 'CashApp Logs', icon: Smartphone, path: '/dashboard/cashapp' },
    { name: 'Tools', icon: Wrench, path: '/dashboard/tools' },
    { name: 'Cart', icon: ShoppingCart, path: '/dashboard/cart' },
    { name: 'Orders', icon: ClipboardList, path: '/dashboard/orders' },
    { name: 'Support', icon: HelpCircle, path: '/dashboard/support' },
  ];

  const quickTips = [
    "Secure platform with bulletproof servers",
    "Re-checked logs after bulk purchases", 
    "2-hour return window with screenshots",
    "24/7 support available"
  ];

  const platformFeatures = [
    {
      icon: Lock,
      title: "Secure",
      description: "Fast & secure log purchases"
    },
    {
      icon: Settings,
      title: "Customizable",
      description: "Tailored to your needs"
    },
    {
      icon: User,
      title: "User-Friendly",
      description: "Easy to navigate"
    },
    {
      icon: LifeBuoy,
      title: "24/7 Support",
      description: "Always here to help"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-cyber-gradient flex w-full">
        <AppSidebar sidebarItems={sidebarItems} onLogout={handleLogout} />
        
        <SidebarInset className="flex-1">
          {/* Header with Sidebar Toggle */}
          <header className="bg-cyber-darker/50 border-b border-cyber-blue/20 p-3 sm:p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <SidebarTrigger className="
                  bg-cyber-blue/20 
                  border-2 
                  border-cyber-blue 
                  text-cyber-blue 
                  hover:bg-cyber-blue 
                  hover:text-cyber-dark 
                  transition-all 
                  duration-300 
                  w-10 h-10 sm:w-12 sm:h-12
                  rounded-lg 
                  shadow-lg 
                  shadow-cyber-blue/30
                  hover:shadow-cyber-blue/50
                  hover:scale-105
                  active:scale-95
                " />
                <div>
                  <h1 className="text-lg sm:text-2xl font-cyber font-bold text-cyber-blue">
                    Welcome, {username}!
                  </h1>
                </div>
              </div>
              
              {/* Tier Progress Bar - Top Right */}
              <div className="w-full sm:w-80">
                <UserTierSystem compact={true} />
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl space-y-4 sm:space-y-8"
            >
              {/* Tier System Details - Mobile First */}
              <div className="block sm:hidden">
                <UserTierSystem />
              </div>

              {/* Quick Tips - Condensed */}
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl font-cyber font-bold text-cyber-blue">
                  Quick Info
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  {quickTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="text-cyber-light/80 text-sm sm:text-base p-2 sm:p-3 bg-cyber-darker/40 rounded-lg border border-cyber-blue/20"
                    >
                      • {tip}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tier System Details - Desktop */}
              <div className="hidden sm:block">
                <UserTierSystem />
              </div>

              {/* Platform Features - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="text-lg sm:text-2xl font-cyber font-bold text-center text-cyber-blue">
                  Why Choose Us?
                </h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                  {platformFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    >
                      <Card className="bg-cyber-darker/60 border-cyber-blue/30 hover:border-cyber-blue/60 transition-all duration-300 h-full">
                        <CardHeader className="text-center pb-2 sm:pb-4 p-3 sm:p-6">
                          <div className="flex justify-center mb-2 sm:mb-4">
                            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-cyber-blue/20 rounded-lg flex items-center justify-center">
                              <feature.icon className="h-4 w-4 sm:h-6 sm:w-6 text-cyber-blue" />
                            </div>
                          </div>
                          <CardTitle className="text-sm sm:text-lg font-cyber text-cyber-light">
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center p-3 sm:p-6 pt-0">
                          <p className="text-cyber-light/80 text-xs sm:text-sm leading-relaxed">
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
      <SidebarHeader className="p-4 sm:p-6 border-b border-cyber-blue/20">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cyber-blue rounded-lg flex items-center justify-center">
            <span className="text-cyber-dark font-bold text-sm sm:text-base">C</span>
          </div>
          {state === 'expanded' && (
            <span className="text-lg sm:text-xl font-cyber font-bold text-cyber-blue">CRYPTOBOI-911</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 sm:space-y-2">
              {sidebarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard')}
                    className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all ${
                      location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard')
                        ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                        : 'text-cyber-light/70 hover:bg-cyber-blue/10 hover:text-cyber-blue'
                    }`}
                  >
                    <Link to={item.path} className="flex items-center space-x-2 sm:space-x-3 w-full">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="font-tech text-sm sm:text-base">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 sm:p-4 border-t border-cyber-blue/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all w-full"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-tech text-sm sm:text-base">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Dashboard;
