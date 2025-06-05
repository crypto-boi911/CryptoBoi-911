
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Shield, DollarSign, ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const PayPalLogs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [minBalance, setMinBalance] = useState('');
  const [maxBalance, setMaxBalance] = useState('');
  const [selectedAccountTypes, setSelectedAccountTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const paypalProducts = [
    { id: 1, account: 'Business Verified', balance: '$45,000', status: 'Verified', price: '$750' },
    { id: 2, account: 'Personal Premium', balance: '$22,500', status: 'Verified', price: '$500' },
    { id: 3, account: 'Business Standard', balance: '$67,000', status: 'Limited', price: '$900' },
    { id: 4, account: 'Personal Basic', balance: '$8,750', status: 'Verified', price: '$250' },
    { id: 5, account: 'Business Pro', balance: '$85,000', status: 'Verified', price: '$1200' },
    { id: 6, account: 'Personal Plus', balance: '$15,500', status: 'Limited', price: '$350' },
    { id: 7, account: 'Business Elite', balance: '$120,000', status: 'Verified', price: '$1500' },
    { id: 8, account: 'Personal Standard', balance: '$12,000', status: 'Verified', price: '$300' },
  ];

  const accountTypes = ['Business', 'Personal'];
  const statuses = ['Verified', 'Limited'];

  // Helper function to convert balance string to number
  const parseBalance = (balanceStr: string) => {
    return parseInt(balanceStr.replace(/[$,]/g, ''));
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = paypalProducts.filter(product => {
      // Search by account name
      const matchesSearch = product.account.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by balance range
      const balance = parseBalance(product.balance);
      const min = minBalance ? parseInt(minBalance) : 0;
      const max = maxBalance ? parseInt(maxBalance) : Infinity;
      const matchesBalance = balance >= min && balance <= max;
      
      // Filter by account type
      const accountType = product.account.split(' ')[0];
      const matchesType = selectedAccountTypes.length === 0 || selectedAccountTypes.includes(accountType);
      
      // Filter by status
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(product.status);
      
      return matchesSearch && matchesBalance && matchesType && matchesStatus;
    });

    // Sort products
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.account.localeCompare(b.account));
    } else if (sortBy === 'balance-low') {
      filtered.sort((a, b) => parseBalance(a.balance) - parseBalance(b.balance));
    } else if (sortBy === 'balance-high') {
      filtered.sort((a, b) => parseBalance(b.balance) - parseBalance(a.balance));
    }

    return filtered;
  }, [searchTerm, minBalance, maxBalance, selectedAccountTypes, selectedStatuses, sortBy]);

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.account} PayPal account has been added to your cart.`,
    });
    console.log('Added to cart:', product);
  };

  const handleAccountTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedAccountTypes([...selectedAccountTypes, type]);
    } else {
      setSelectedAccountTypes(selectedAccountTypes.filter(t => t !== type));
    }
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setSelectedStatuses([...selectedStatuses, status]);
    } else {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinBalance('');
    setMaxBalance('');
    setSelectedAccountTypes([]);
    setSelectedStatuses([]);
    setSortBy('name');
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
            PayPal Logs
          </h1>
          <p className="text-cyber-light/60">
            Verified PayPal account access with various balance levels ({filteredProducts.length} available)
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-light/50 h-4 w-4" />
            <Input 
              placeholder="Search by account name..."
              className="pl-10 bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48 bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-cyber-gray border-cyber-blue/20">
              <SelectItem value="name" className="text-cyber-light hover:bg-cyber-blue/10">Name A-Z</SelectItem>
              <SelectItem value="balance-low" className="text-cyber-light hover:bg-cyber-blue/10">Balance: Low to High</SelectItem>
              <SelectItem value="balance-high" className="text-cyber-light hover:bg-cyber-blue/10">Balance: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Advanced Filters */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-cyber-blue/20 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-cyber-gray border-cyber-blue/20" align="end">
              <div className="space-y-4">
                <h4 className="font-medium text-cyber-light">Filter Options</h4>
                
                {/* Balance Range */}
                <div className="space-y-2">
                  <label className="text-sm text-cyber-light/70">Balance Range</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Min"
                      type="number"
                      value={minBalance}
                      onChange={(e) => setMinBalance(e.target.value)}
                      className="bg-cyber-gray/50 border-cyber-blue/20 text-cyber-light"
                    />
                    <Input
                      placeholder="Max"
                      type="number"
                      value={maxBalance}
                      onChange={(e) => setMaxBalance(e.target.value)}
                      className="bg-cyber-gray/50 border-cyber-blue/20 text-cyber-light"
                    />
                  </div>
                </div>

                {/* Account Types */}
                <div className="space-y-2">
                  <label className="text-sm text-cyber-light/70">Account Types</label>
                  <div className="space-y-2">
                    {accountTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedAccountTypes.includes(type)}
                          onCheckedChange={(checked) => handleAccountTypeChange(type, checked as boolean)}
                          className="border-cyber-blue/30"
                        />
                        <label htmlFor={type} className="text-sm text-cyber-light">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-sm text-cyber-light/70">Status</label>
                  <div className="space-y-2">
                    {statuses.map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={status}
                          checked={selectedStatuses.includes(status)}
                          onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                          className="border-cyber-blue/30"
                        />
                        <label htmlFor={status} className="text-sm text-cyber-light">
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full border-cyber-blue/30 text-cyber-light hover:bg-cyber-blue/10"
                >
                  Clear All Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* No results message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-cyber-light/60 text-lg">
              No PayPal accounts found matching your criteria
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
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-cyber-light font-tech">{product.account}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-green-400" />
                        <span className="text-green-400 text-xs">{product.status}</span>
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

export default PayPalLogs;
