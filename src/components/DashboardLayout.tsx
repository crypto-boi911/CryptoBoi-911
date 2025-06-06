
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Shield, 
  CreditCard, 
  Wallet, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Clock, 
  MessageSquare, 
  LogOut,
  ArrowLeft,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, showBackButton = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Shield, current: location.pathname === '/dashboard' },
    { name: 'Premium Banklogs', href: '/dashboard/premium-banklogs', icon: CreditCard, current: location.pathname === '/dashboard/premium-banklogs' },
    { name: 'CC Linkable', href: '/dashboard/cc-linkable', icon: CreditCard, current: location.pathname === '/dashboard/cc-linkable' },
    { name: 'PayPal Logs', href: '/dashboard/paypal-logs', icon: Wallet, current: location.pathname === '/dashboard/paypal-logs' },
    { name: 'CashApp Logs', href: '/dashboard/cashapp-logs', icon: DollarSign, current: location.pathname === '/dashboard/cashapp-logs' },
    { name: 'Tools', href: '/dashboard/tools', icon: Package, current: location.pathname === '/dashboard/tools' },
    { name: 'Cart', href: '/dashboard/cart', icon: ShoppingCart, current: location.pathname === '/dashboard/cart' },
    { name: 'Order History', href: '/dashboard/orders', icon: Clock, current: location.pathname === '/dashboard/orders' },
    { name: 'Tickets', href: '/dashboard/tickets', icon: MessageSquare, current: location.pathname === '/dashboard/tickets' },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cyber-gradient">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="fixed inset-0 bg-cyber-dark/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 w-64 bg-cyber-darker/90 backdrop-blur-sm border-r border-cyber-blue/30"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-cyber-blue/30">
                <div className="flex items-center space-x-2">
                  <Shield className="h-8 w-8 text-cyber-blue" />
                  <span className="text-xl font-cyber text-cyber-blue">SecureVault</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="text-cyber-light hover:text-cyber-blue"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Mobile navigation */}
              <nav className="mt-4 px-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1 transition-colors ${
                      item.current
                        ? 'bg-cyber-blue/20 text-cyber-blue'
                        : 'text-cyber-light hover:bg-cyber-blue/10 hover:text-cyber-blue'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
                
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start mt-4 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </Button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-cyber-darker/90 backdrop-blur-sm border-r border-cyber-blue/30">
          <div className="flex h-16 flex-shrink-0 items-center px-4 border-b border-cyber-blue/30">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyber-blue" />
              <span className="text-xl font-cyber text-cyber-blue">SecureVault</span>
            </div>
          </div>
          
          <div className="flex flex-1 flex-col overflow-y-auto">
            {/* User info */}
            <div className="p-4 border-b border-cyber-blue/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-cyber-blue/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-cyber-blue" />
                </div>
                <div>
                  <p className="text-cyber-light font-medium">{profile?.username}</p>
                  <Badge variant="outline" className="text-xs border-cyber-blue/30 text-cyber-blue">
                    {profile?.tier}
                  </Badge>
                </div>
              </div>
            </div>
            
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? 'bg-cyber-blue/20 text-cyber-blue'
                      : 'text-cyber-light hover:bg-cyber-blue/10 hover:text-cyber-blue'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="p-4 border-t border-cyber-blue/20">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-cyber-blue/30 bg-cyber-darker/90 backdrop-blur-sm px-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-cyber-light hover:text-cyber-blue"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center space-x-4">
              {showBackButton && (
                <Button
                  onClick={() => navigate(-1)}
                  variant="ghost"
                  size="sm"
                  className="text-cyber-light hover:text-cyber-blue"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <h1 className="text-xl font-cyber text-cyber-blue">{title}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-cyber-light/70 hidden sm:block">
                Welcome, {profile?.username}
              </span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
