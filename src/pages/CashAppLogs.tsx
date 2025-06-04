
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CashAppLogs = () => {
  const cashappProducts = [
    { account: 'Verified Premium', balance: '$15,000', features: 'Bitcoin Ready', price: '$400' },
    { account: 'Business Account', balance: '$35,000', features: 'High Limit', price: '$650' },
    { account: 'Standard Account', balance: '$8,500', features: 'Basic Access', price: '$200' },
    { account: 'Gold Verified', balance: '$25,000', features: 'Premium Features', price: '$550' },
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
            CashApp Logs
          </h1>
          <p className="text-cyber-light/60">
            Mobile payment platform logs with instant access capabilities
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cashappProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-cyber-light font-tech">{product.account}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-yellow-400" />
                        <span className="text-cyber-light/60 text-xs">{product.features}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-cyber-light/60">Balance:</span>
                      <span className="text-cyber-blue font-bold">{product.balance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-light/60">Price:</span>
                      <span className="text-green-400 font-bold">{product.price}</span>
                    </div>
                    <Button className="w-full bg-cyber-blue/20 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark">
                      Add to Cart
                    </Button>
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

export default CashAppLogs;
