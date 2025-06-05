
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Filter, Search, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const BankLogs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const bankProducts = [
    { id: 1, bank: 'Chase Bank', balance: '$25,000', type: 'Checking', price: '$500' },
    { id: 2, bank: 'Bank of America', balance: '$18,500', type: 'Savings', price: '$400' },
    { id: 3, bank: 'Wells Fargo', balance: '$32,000', type: 'Business', price: '$650' },
    { id: 4, bank: 'Citibank', balance: '$15,750', type: 'Checking', price: '$350' },
    { id: 5, bank: 'TD Bank', balance: '$42,000', type: 'Business', price: '$750' },
    { id: 6, bank: 'PNC Bank', balance: '$28,300', type: 'Savings', price: '$550' },
    { id: 7, bank: 'US Bank', balance: '$19,800', type: 'Checking', price: '$420' },
    { id: 8, bank: 'Capital One', balance: '$36,500', type: 'Business', price: '$680' },
    { id: 9, bank: 'Truist Bank', balance: '$21,200', type: 'Savings', price: '$480' },
    { id: 10, bank: 'Fifth Third Bank', balance: '$33,700', type: 'Checking', price: '$620' },
    { id: 11, bank: 'Regions Bank', balance: '$27,900', type: 'Business', price: '$540' },
    { id: 12, bank: 'KeyBank', balance: '$16,400', type: 'Savings', price: '$380' },
    { id: 13, bank: 'M&T Bank', balance: '$38,600', type: 'Checking', price: '$710' },
    { id: 14, bank: 'Huntington Bank', balance: '$22,800', type: 'Business', price: '$490' },
    { id: 15, bank: 'Comerica Bank', balance: '$31,500', type: 'Savings', price: '$590' },
    { id: 16, bank: 'Zions Bank', balance: '$24,300', type: 'Checking', price: '$510' },
    { id: 17, bank: 'First National Bank', balance: '$29,700', type: 'Business', price: '$570' },
    { id: 18, bank: 'Synovus Bank', balance: '$17,600', type: 'Savings', price: '$390' },
    { id: 19, bank: 'Associated Bank', balance: '$35,200', type: 'Checking', price: '$660' },
    { id: 20, bank: 'Frost Bank', balance: '$26,800', type: 'Business', price: '$530' },
    { id: 21, bank: 'Santander Bank', balance: '$20,400', type: 'Savings', price: '$450' },
    { id: 22, bank: 'BMO Harris Bank', balance: '$34,100', type: 'Checking', price: '$640' },
    { id: 23, bank: 'TCF Bank', balance: '$23,900', type: 'Business', price: '$500' },
    { id: 24, bank: 'Webster Bank', balance: '$30,600', type: 'Savings', price: '$580' },
  ];

  // Filter products based on search term
  const filteredProducts = bankProducts.filter(product =>
    product.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.bank} ${product.type} account has been added to your cart.`,
    });
    console.log('Added to cart:', product);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

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
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border-cyber-blue/30 text-cyber-light hover:bg-cyber-blue/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="text-3xl font-cyber font-bold text-cyber-light mb-4">
            Bank Logs
          </h1>
          <p className="text-cyber-light/60">
            Premium bank account credentials with verified balances ({filteredProducts.length} available)
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-light/50 h-4 w-4" />
            <Input 
              placeholder="Search by bank name..."
              className="pl-10 bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Button className="bg-cyber-blue/20 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* No results message */}
        {filteredProducts.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-cyber-light/60 text-lg">
              No banks found matching "{searchTerm}"
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
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
                    <Button 
                      className="w-full bg-cyber-blue/20 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                      onClick={() => handleAddToCart(product)}
                    >
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
