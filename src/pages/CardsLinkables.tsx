
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Smartphone, ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CardsLinkables = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [minLimit, setMinLimit] = useState('');
  const [maxLimit, setMaxLimit] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const cardProducts = [
    { 
      id: 1,
      type: 'Credit Card', 
      brand: 'Visa Platinum', 
      limit: '$50,000', 
      price: '$800',
      features: ['High Limit', 'Verified', 'Premium']
    },
    { 
      id: 2,
      type: 'Debit Card', 
      brand: 'Mastercard Gold', 
      limit: '$25,000', 
      price: '$450',
      features: ['Instant Access', 'Verified']
    },
    { 
      id: 3,
      type: 'Virtual Card', 
      brand: 'American Express', 
      limit: '$75,000', 
      price: '$1200',
      features: ['Virtual', 'High Limit', 'Premium', 'Verified']
    },
    { 
      id: 4,
      type: 'Prepaid Card', 
      brand: 'Visa Green', 
      limit: '$10,000', 
      price: '$200',
      features: ['Prepaid', 'Safe']
    },
    { 
      id: 5,
      type: 'Credit Card', 
      brand: 'Mastercard Black', 
      limit: '$100,000', 
      price: '$1500',
      features: ['Ultra High Limit', 'Premium', 'Verified']
    },
    { 
      id: 6,
      type: 'Debit Card', 
      brand: 'Visa Business', 
      limit: '$35,000', 
      price: '$650',
      features: ['Business', 'High Limit', 'Verified']
    },
  ];

  const cardTypes = ['Credit Card', 'Debit Card', 'Virtual Card', 'Prepaid Card'];

  // Helper function to convert limit string to number
  const parseLimit = (limitStr: string) => {
    return parseInt(limitStr.replace(/[$,]/g, ''));
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = cardProducts.filter(product => {
      // Search by brand name
      const matchesSearch = product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by limit range
      const limit = parseLimit(product.limit);
      const min = minLimit ? parseInt(minLimit) : 0;
      const max = maxLimit ? parseInt(maxLimit) : Infinity;
      const matchesLimit = limit >= min && limit <= max;
      
      // Filter by card type
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      
      return matchesSearch && matchesLimit && matchesType;
    });

    // Sort products
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (sortBy === 'limit-low') {
      filtered.sort((a, b) => parseLimit(a.limit) - parseLimit(b.limit));
    } else if (sortBy === 'limit-high') {
      filtered.sort((a, b) => parseLimit(b.limit) - parseLimit(a.limit));
    }

    return filtered;
  }, [searchTerm, minLimit, maxLimit, selectedTypes, sortBy]);

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.brand} ${product.type} has been added to your cart.`,
    });
    console.log('Added to cart:', product);
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinLimit('');
    setMaxLimit('');
    setSelectedTypes([]);
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
            Cards & Linkables
          </h1>
          <p className="text-cyber-light/60">
            Credit cards, debit cards, and linkable payment methods ({filteredProducts.length} available)
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-light/50 h-4 w-4" />
            <Input 
              placeholder="Search by brand name..."
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
              <SelectItem value="limit-low" className="text-cyber-light hover:bg-cyber-blue/10">Limit: Low to High</SelectItem>
              <SelectItem value="limit-high" className="text-cyber-light hover:bg-cyber-blue/10">Limit: High to Low</SelectItem>
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
                
                {/* Limit Range */}
                <div className="space-y-2">
                  <label className="text-sm text-cyber-light/70">Limit Range</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Min"
                      type="number"
                      value={minLimit}
                      onChange={(e) => setMinLimit(e.target.value)}
                      className="bg-cyber-gray/50 border-cyber-blue/20 text-cyber-light"
                    />
                    <Input
                      placeholder="Max"
                      type="number"
                      value={maxLimit}
                      onChange={(e) => setMaxLimit(e.target.value)}
                      className="bg-cyber-gray/50 border-cyber-blue/20 text-cyber-light"
                    />
                  </div>
                </div>

                {/* Card Types */}
                <div className="space-y-2">
                  <label className="text-sm text-cyber-light/70">Card Types</label>
                  <div className="space-y-2">
                    {cardTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                          className="border-cyber-blue/30"
                        />
                        <label htmlFor={type} className="text-sm text-cyber-light">
                          {type}
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
              No cards found matching your criteria
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
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-cyber-light font-tech">{product.brand}</CardTitle>
                      <p className="text-cyber-light/60 text-sm">{product.type}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-cyber-light/60">Limit:</span>
                      <span className="text-cyber-blue font-bold">{product.limit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-light/60">Price:</span>
                      <span className="text-green-400 font-bold">{product.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="text-xs border-cyber-blue/30 text-cyber-blue"
                        >
                          {feature}
                        </Badge>
                      ))}
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

export default CardsLinkables;
