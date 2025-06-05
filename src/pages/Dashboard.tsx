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
  const [username, setUsername] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get the stored username from when they registered
    const storedRegistrations = localStorage.getItem('userRegistrations');
    if (storedRegistrations) {
      const registrations = JSON.parse(storedRegistrations);
      if (registrations.length > 0) {
        // Get the most recent user (last in array)
        const recentUser = registrations[registrations.length - 1];
        setUsername(recentUser.username);
      }
    }
    
    // Fallback: if no stored registrations, check credentials
    if (!username) {
      const storedCredentials = localStorage.getItem('userCredentials');
      if (storedCredentials) {
        const credentials = JSON.parse(storedCredentials);
        if (credentials.length > 0) {
          const recentUser = credentials[credentials.length - 1];
          setUsername(recentUser.username);
        }
      }
    }
    
    // Final fallback: if no stored data, use a default
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
    { name: 'Bank Logs', icon: CreditCard, path: '/dashboard/bank-logs' },
    { name: 'Cards/Linkables', icon: CreditCard, path: '/dashboard/cards' },
    { name: 'PayPal Logs', icon: Database, path: '/dashboard/paypal' },
    { name: 'CashApp Logs', icon: Smartphone, path: '/dashboard/cashapp' },
    { name: 'Tools', icon: Wrench, path: '/dashboard/tools' },
    { name: 'Cart', icon: ShoppingCart, path: '/dashboard/cart' },
    { name: 'Orders', icon: ClipboardList, path: '/dashboard/orders' },
    { name: 'Support', icon: HelpCircle, path: '/dashboard/support' },
  ];

  const faqContent = [
    "Our store embodies a self-written engine, anti-DDoS system and a bulletproof server.",
    "Logs are re-checked and updated after each occurrence of issuing bulk purchases.",
    "Please do not hesitate to contact the support team if you encounter any issue.",
    "-Warning : Any inconsistency or tampering of the system will result in a temporary closure of your account immediately.",
    "-Kindly take sometime to go through our rules, (T & C's apply) :",
    "-Funds sent through bitcoin for top-ups will be credited to your account after 2 confirmations.",
    "-CYBERKRYPT disclaims any liability for any further actions you do with the purchased log in your possession.",
    "-All accounts left inactive for six (6) months will be deactivated automatically.",
    "-A token would be issued to any account after making three instant purchases or issuing a deposit of balance higher than $1000",
    "-After buying the goods, you will have a countdown on the return time, at the moment it is 2 hours, which is enough to check your account. Please specify the correct gills and always attach screenshots, otherwise the return will be denied-Clients ' personal data is stored in a database with non-standard encryption and guaranteed security."
  ];

  const platformFeatures = [
    {
      icon: Lock,
      title: "Fast & Secure",
      description: "Your data is secure with us. We ensure fast log purchase and secure access."
    },
    {
      icon: Settings,
      title: "Customizable Options",
      description: "Tailor logs to meet your specific needs, with a variety of categories."
    },
    {
      icon: User,
      title: "User-Friendly",
      description: "Enjoy an intuitive dashboard that's easy to navigate and operate."
    },
    {
      icon: LifeBuoy,
      title: "24/7 Support",
      description: "Get support anytime you need it with our reliable customer service."
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
                  <h1 className="text-2xl font-cyber font-bold text-cyber-blue mb-2">
                    Welcome back, {username}!
                  </h1>
                </div>
              </div>
              
              {/* Tier Progress Bar - Top Right */}
              <div className="w-80">
                <UserTierSystem compact={true} />
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              {/* Navigation Pills */}
              <div className="flex gap-4 mb-8">
                <div className="text-red-400 px-4 py-2 rounded-lg font-tech cursor-pointer hover:bg-red-500/10">
                  FAQ
                </div>
              </div>

              {/* Tier System Details */}
              <div className="mb-8">
                <UserTierSystem />
              </div>

              {/* FAQ Content */}
              <div className="space-y-6 mb-16">
                {faqContent.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="text-cyber-light leading-relaxed"
                  >
                    <p className="text-lg">{item}</p>
                  </motion.div>
                ))}
              </div>

              {/* Why Choose Our Platform Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-cyber font-bold text-center text-cyber-blue mb-12">
                  Why Choose Our Platform?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {platformFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    >
                      <Card className="bg-cyber-darker/60 border-cyber-blue/30 hover:border-cyber-blue/60 transition-all duration-300 h-full">
                        <CardHeader className="text-center pb-4">
                          <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-cyber-blue/20 rounded-lg flex items-center justify-center">
                              <feature.icon className="h-8 w-8 text-cyber-blue" />
                            </div>
                          </div>
                          <CardTitle className="text-xl font-cyber text-cyber-light">
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-cyber-light/80 leading-relaxed">
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
            <span className="text-xl font-cyber font-bold text-cyber-blue">CRYPTOBOI-911</span>
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
