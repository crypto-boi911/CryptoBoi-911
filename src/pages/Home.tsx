
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Shield, Lock, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && user) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
        <div className="text-cyber-light flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyber-blue"></div>
          Loading...
        </div>
      </div>
    );
  }

  // If user is authenticated, they'll be redirected, so this won't show
  if (user) {
    return null;
  }

  const features = [
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Bank-grade security with encrypted transactions"
    },
    {
      icon: Lock,
      title: "Private Access",
      description: "Exclusive access with secure key authentication"
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "Join thousands of verified users worldwide"
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Lightning-fast transactions and instant delivery"
    }
  ];

  return (
    <main className="min-h-screen bg-cyber-gradient">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-cyber font-bold text-cyber-blue mb-6">
            CRYPTOBOI-911
          </h1>
          <p className="text-xl md:text-2xl text-cyber-light mb-8">
            Your Secure Platform for Digital Financial Services
          </p>
          <p className="text-cyber-light/70 text-lg mb-12 max-w-2xl mx-auto">
            Access premium financial tools and services with military-grade security. 
            Join our exclusive platform today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/get-started')}
              className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech font-semibold py-4 px-8 text-lg"
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 font-tech font-semibold py-4 px-8 text-lg"
            >
              Login
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <Card key={index} className="bg-cyber-darker/60 border-cyber-blue/30 hover:border-cyber-blue/60 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-cyber-blue/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-cyber-blue" />
                  </div>
                </div>
                <CardTitle className="text-cyber-light font-tech">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-cyber-light/80 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Card className="bg-cyber-darker/40 border-cyber-blue/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-cyber font-bold text-cyber-blue mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-cyber-light/70 mb-6">
                Create your secure access key in minutes and join our platform
              </p>
              <Button
                onClick={() => navigate('/get-started')}
                className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech font-semibold py-3 px-6"
              >
                Generate Access Key
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
