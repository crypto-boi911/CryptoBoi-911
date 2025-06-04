
import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BankLogs = () => {
  const bankProducts = [
    { bank: 'Chase Bank', balance: '$25,000', type: 'Checking', price: '$500' },
    { bank: 'Bank of America', balance: '$18,500', type: 'Savings', price: '$400' },
    { bank: 'Wells Fargo', balance: '$32,000', type: 'Business', price: '$650' },
    { bank: 'Citibank', balance: '$15,750', type: 'Checking', price: '$350' },
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
            Bank Logs
          </h1>
          <p className="text-cyber-light/60">
            Premium bank account credentials with verified balances
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-light/50 h-4 w-4" />
            <Input 
              placeholder="Search by bank name..."
              className="pl-10 bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
            />
          </div>
          <Button className="bg-cyber-blue/20 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bankProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-cyber-light font-tech">{product.bank}</CardTitle>
                      <p className="text-cyber-light/60 text-sm">{product.type}</p>
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

export default BankLogs;
