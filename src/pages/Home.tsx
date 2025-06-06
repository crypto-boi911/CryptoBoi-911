
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Lock, Zap, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const { user, profile, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect authenticated users based on their role
      if (profile?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, profile, isLoading, navigate]);

  const features = [
    {
      icon: Lock,
      title: "Secure",
      description: "Advanced encryption and security protocols"
    },
    {
      icon: Zap,
      title: "Fast",
      description: "Lightning-fast access to premium accounts"
    },
    {
      icon: Users,
      title: "Trusted",
      description: "Thousands of satisfied customers worldwide"
    },
    {
      icon: Globe,
      title: "Global",
      description: "Worldwide coverage and support"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
        <div className="text-cyber-blue text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-cyber-gradient">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <Shield className="h-16 w-16 text-cyber-blue mr-4" />
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-cyber font-bold text-cyber-blue">
                  HUXLOGS
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-cyber-light mb-8 max-w-3xl mx-auto">
                Premium cybersecurity solutions and digital assets for modern threats
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/products')}
                  className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech text-lg px-8 py-4"
                  size="lg"
                >
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  variant="outline"
                  className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 font-tech text-lg px-8 py-4"
                  size="lg"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="bg-cyber-darker/60 border-cyber-blue/30 hover:border-cyber-blue/60 transition-all duration-300 h-full">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-cyber-blue/20 rounded-lg flex items-center justify-center">
                          <feature.icon className="h-6 w-6 text-cyber-blue" />
                        </div>
                      </div>
                      <CardTitle className="text-lg font-cyber text-cyber-light">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-cyber-light/80 text-sm">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-center"
            >
              <Card className="bg-cyber-darker/60 border-cyber-blue/30 p-12">
                <CardContent>
                  <h2 className="text-3xl md:text-4xl font-cyber font-bold text-cyber-blue mb-6">
                    Ready to Get Started?
                  </h2>
                  <p className="text-cyber-light/70 text-lg mb-8 max-w-2xl mx-auto">
                    Join thousands of satisfied customers and experience the best in cybersecurity solutions
                  </p>
                  <Button
                    onClick={() => navigate('/signup')}
                    className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech text-lg px-8 py-4"
                    size="lg"
                  >
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
