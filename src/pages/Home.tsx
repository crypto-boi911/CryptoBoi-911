
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, redirect to dashboard
    if (user && !isLoading) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
        <div className="text-cyber-blue text-xl">Loading...</div>
      </div>
    );
  }

  // Only show home page if user is not logged in
  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-cyber-gradient">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <Shield className="h-16 w-16 text-cyber-blue" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-cyber font-bold text-cyber-blue mb-6">
              HUXLOGS
            </h1>
            
            <p className="text-xl md:text-2xl text-cyber-light/80 mb-8 max-w-3xl mx-auto">
              Premium Digital Assets & Financial Tools
            </p>
            
            <p className="text-lg text-cyber-light/60 mb-12 max-w-2xl mx-auto">
              Access verified bank logs, PayPal accounts, credit cards, and professional tools. 
              Secure, reliable, and backed by our guarantee.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark text-lg px-8 py-4 h-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/login">
                <Button variant="outline" className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 text-lg px-8 py-4 h-auto">
                  Login
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-cyber-darker/40 p-6 rounded-lg border border-cyber-blue/20"
              >
                <h3 className="text-xl font-cyber text-cyber-blue mb-3">Premium Bank Logs</h3>
                <p className="text-cyber-light/70">High-balance verified accounts from top financial institutions</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-cyber-darker/40 p-6 rounded-lg border border-cyber-blue/20"
              >
                <h3 className="text-xl font-cyber text-cyber-blue mb-3">Digital Wallets</h3>
                <p className="text-cyber-light/70">PayPal and CashApp accounts with verified balances</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-cyber-darker/40 p-6 rounded-lg border border-cyber-blue/20"
              >
                <h3 className="text-xl font-cyber text-cyber-blue mb-3">Professional Tools</h3>
                <p className="text-cyber-light/70">Security tools and utilities for professionals</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
