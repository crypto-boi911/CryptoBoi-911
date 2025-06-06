
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Shield, Lock, Users, Zap, Star, CheckCircle, Globe, Clock } from 'lucide-react';
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
      title: "Premium Security",
      description: "Military-grade encryption with advanced security protocols"
    },
    {
      icon: Users,
      title: "Trusted Network", 
      description: "Join thousands of verified members worldwide"
    },
    {
      icon: Zap,
      title: "Instant Access",
      description: "Quick setup and immediate access to all services"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Worldwide service availability 24/7"
    }
  ];

  const services = [
    { name: "Bank Logs", description: "Premium banking credentials" },
    { name: "Cards & Linkables", description: "High-quality financial cards" },
    { name: "PayPal Logs", description: "Verified PayPal accounts" },
    { name: "CashApp Logs", description: "Active CashApp credentials" },
    { name: "Tools & Utilities", description: "Professional security tools" },
    { name: "24/7 Support", description: "Round-the-clock assistance" }
  ];

  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
    { value: "256-bit", label: "Encryption" }
  ];

  return (
    <main className="min-h-screen bg-cyber-gradient">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-cyber-blue mr-4" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-cyber font-bold text-cyber-blue">
                HUXLOGS
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-cyber-light mb-6 font-tech">
              Premium Digital Financial Services Platform
            </p>
            
            <p className="text-cyber-light/80 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Access exclusive financial tools and services with enterprise-grade security. 
              Join our verified community of professionals worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => navigate('/get-started')}
                className="bg-cyber-blue hover:bg-cyber-blue/90 text-cyber-dark font-tech font-semibold py-4 px-8 text-lg"
                size="lg"
              >
                Get Started Now
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 font-tech font-semibold py-4 px-8 text-lg"
                size="lg"
              >
                Member Login
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-cyber font-bold text-cyber-blue mb-2">
                    {stat.value}
                  </div>
                  <div className="text-cyber-light/70 font-tech text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cyber-darker/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-cyber font-bold text-cyber-light mb-4">
              Why Choose HUXLOGS
            </h2>
            <p className="text-cyber-light/70 text-lg max-w-2xl mx-auto">
              Industry-leading security and reliability you can trust
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-cyber-darker/60 border-cyber-blue/30 hover:border-cyber-blue/60 transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-cyber-blue/20 rounded-xl flex items-center justify-center">
                        <feature.icon className="h-8 w-8 text-cyber-blue" />
                      </div>
                    </div>
                    <CardTitle className="text-cyber-light font-tech text-lg">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-cyber-light/80 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-cyber font-bold text-cyber-light mb-4">
              Our Services
            </h2>
            <p className="text-cyber-light/70 text-lg max-w-2xl mx-auto">
              Comprehensive financial solutions for verified members
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center p-6 bg-cyber-darker/40 border border-cyber-blue/20 rounded-lg hover:border-cyber-blue/40 transition-all duration-300"
              >
                <CheckCircle className="h-6 w-6 text-cyber-blue mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-tech font-semibold text-cyber-light mb-1">
                    {service.name}
                  </h3>
                  <p className="text-cyber-light/70 text-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cyber-darker/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <Card className="bg-cyber-darker/60 border-cyber-blue/30 max-w-3xl mx-auto">
              <CardContent className="p-12">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-cyber-blue/20 rounded-full flex items-center justify-center">
                    <Star className="h-10 w-10 text-cyber-blue" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-cyber font-bold text-cyber-blue mb-6">
                  Ready to Join?
                </h2>
                <p className="text-cyber-light/80 text-lg mb-8 max-w-2xl mx-auto">
                  Create your secure access account in minutes and unlock premium financial services
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/get-started')}
                    className="bg-cyber-blue hover:bg-cyber-blue/90 text-cyber-dark font-tech font-semibold py-3 px-8 text-lg"
                  >
                    Create Account
                  </Button>
                  <Button
                    onClick={() => navigate('/login')}
                    variant="outline"
                    className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 font-tech font-semibold py-3 px-8 text-lg"
                  >
                    Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
