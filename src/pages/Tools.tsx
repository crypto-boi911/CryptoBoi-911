
import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Shield, Zap, Globe, Lock, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Tools = () => {
  const tools = [
    { 
      name: 'VPN Access', 
      description: 'Secure browsing with premium VPN', 
      icon: Shield, 
      price: 'Free',
      category: 'Security'
    },
    { 
      name: 'Proxy Rotator', 
      description: 'Automatic IP rotation service', 
      icon: Globe, 
      price: '$50/month',
      category: 'Privacy'
    },
    { 
      name: 'Account Checker', 
      description: 'Verify account status and limits', 
      icon: Settings, 
      price: '$25/use',
      category: 'Verification'
    },
    { 
      name: 'Encryption Tool', 
      description: 'Secure data encryption utilities', 
      icon: Lock, 
      price: 'Free',
      category: 'Security'
    },
    { 
      name: 'Fast Transfer', 
      description: 'Quick money transfer protocols', 
      icon: Zap, 
      price: '$100/month',
      category: 'Transfer'
    },
    { 
      name: 'Custom Scripts', 
      description: 'Personalized automation tools', 
      icon: Wrench, 
      price: '$200',
      category: 'Automation'
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-gradient p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-cyber font-bold text-cyber-light mb-4">
            Tools & Utilities
          </h1>
          <p className="text-cyber-light/60">
            Essential tools and utilities to enhance your experience
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-cyber-light font-tech">{tool.name}</CardTitle>
                      <span className="text-cyber-blue text-xs">{tool.category}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-cyber-light/60 text-sm">
                      {tool.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-bold">{tool.price}</span>
                      <Button 
                        size="sm"
                        className="bg-cyber-blue/20 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                      >
                        {tool.price === 'Free' ? 'Access' : 'Subscribe'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Tools;
