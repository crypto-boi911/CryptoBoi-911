
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Shield, 
  LogOut, 
  CreditCard, 
  Wallet, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Clock,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface UserDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}

const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({ 
  children, 
  title, 
  showBackButton = false 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Premium Banklogs', path: '/dashboard/premium-banklogs', icon: CreditCard },
    { name: 'CC Linkable', path: '/dashboard/cc-linkable', icon: CreditCard },
    { name: 'PayPal Logs', path: '/dashboard/paypal-logs', icon: Wallet },
    { name: 'CashApp Logs', path: '/dashboard/cashapp-logs', icon: DollarSign },
    { name: 'Tools', path: '/dashboard/tools', icon: Package },
    { name: 'Cart', path: '/dashboard/cart', icon: ShoppingCart },
    { name: 'Order History', path: '/dashboard/orders', icon: Clock },
    { name: 'Tickets', path: '/dashboard/tickets', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-cyber-gradient">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-cyber-dark/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -320 }}
        className="lg:translate-x-0 fixed inset-y-0 left-0 z-50 w-80 bg-cyber-darker/95 backdrop-blur-lg border-r border-cyber-blue/20 lg:static lg:inset-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-cyber-blue/20">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyber-blue" />
              <span className="font-cyber text-xl font-bold text-cyber-blue">HUXLOGS</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-cyber-light hover:text-cyber-blue"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-cyber-blue/20">
            <h3 className="text-lg font-cyber text-cyber-light mb-2">
              Welcome, {profile?.username}!
            </h3>
            <Badge variant="outline" className="border-cyber-blue/30 text-cyber-blue">
              {profile?.tier || 'Tier 1 – Beginner'}
            </Badge>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                    : 'text-cyber-light hover:text-cyber-blue hover:bg-cyber-blue/10'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-tech">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-6 border-t border-cyber-blue/20">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:pl-80">
        {/* Top Bar */}
        <div className="bg-cyber-darker/60 backdrop-blur-lg border-b border-cyber-blue/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-cyber-light hover:text-cyber-blue"
              >
                <Menu className="h-6 w-6" />
              </button>
              {showBackButton && (
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  size="sm"
                  className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <h1 className="text-2xl font-cyber text-cyber-blue">{title}</h1>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
