import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CardsLinkables = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [minLimit, setMinLimit] = useState('');
  const [maxLimit, setMaxLimit] = useState('');
  const [selectedCardTypes, setSelectedCardTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const cardProducts = [
    { id: 1, card: 'Platinum Visa', limit: '$50,000', type: 'Credit', features: 'Rewards, Low APR', price: '$800' },
    { id: 2, card: 'Gold Mastercard', limit: '$25,000', type: 'Debit', features: 'Cashback, Travel', price: '$450' },
    { id: 3, card: 'Amex Black Card', limit: '$75,000', type: 'Credit', features: 'Exclusive, Concierge', price: '$1200' },
    { id: 4, card: 'Virtual Visa Card', limit: '$15,000', type: 'Virtual', features: 'Online Use', price: '$350' },
    { id: 5, card: 'Prepaid Mastercard', limit: '$5,000', type: 'Prepaid', features: 'Reloadable', price: '$180' },
    { id: 6, card: 'Business Platinum', limit: '$60,000', type: 'Credit', features: 'Business Rewards', price: '$950' },
    { id: 7, card: 'Student Debit Card', limit: '$2,500', type: 'Debit', features: 'No Fees', price: '$100' },
    { id: 8, card: 'Travel Rewards Visa', limit: '$40,000', type: 'Credit', features: 'Travel Points', price: '$700' },
  ];

  const cardTypes = ['Credit', 'Debit', 'Virtual', 'Prepaid'];

  // Helper function to convert limit string to number
  const parseLimit = (limitStr: string) => {
    return parseInt(limitStr.replace(/[$,]/g, ''));
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = cardProducts.filter(product => {
      // Search by card name
      const matchesSearch = product.card.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by limit range
      const limit = parseLimit(product.limit);
      const min = minLimit ? parseInt(minLimit) : 0;
      const max = maxLimit ? parseInt(maxLimit) : Infinity;
      const matchesLimit = limit >= min && limit <= max;
      
      // Filter by card type
      const matchesType = selectedCardTypes.length === 0 || selectedCardTypes.includes(product.type);
      
      return matchesSearch && matchesLimit && matchesType;
    });

    // Sort products
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.card.localeCompare(b.card));
    } else if (sortBy === 'limit-low') {
      filtered.sort((a, b) => parseLimit(a.limit) - parseLimit(b.limit));
    } else if (sortBy === 'limit-high') {
      filtered.sort((a, b) => parseLimit(b.limit) - parseLimit(a.limit));
    }

    return filtered;
  }, [searchTerm, minLimit, maxLimit, selectedCardTypes, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minLimit, maxLimit, selectedCardTypes, sortBy]);

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.card} has been added to your cart.`,
    });
    console.log('Added to cart:', product);
  };

  const handleCardTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedCardTypes([...selectedCardTypes, type]);
    } else {
      setSelectedCardTypes(selectedCardTypes.filter(t => t !== type));
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinLimit('');
    setMaxLimit('');
    setSelectedCardTypes([]);
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
            Premium credit and debit cards with high limits and instant activation ({filteredProducts.length} available)
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-light/50 h-4 w-4" />
            <Input 
              placeholder="Search by card name..."
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
                          checked={selectedCardTypes.includes(type)}
                          onCheckedChange={(checked) => handleCardTypeChange(type, checked as boolean)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-cyber-light font-tech">{product.card}</CardTitle>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent className="bg-cyber-gray/30 border border-cyber-blue/20 rounded-lg p-2">
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={`text-cyber-light hover:bg-cyber-blue/10 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className={`cursor-pointer ${
                        currentPage === page 
                          ? 'bg-cyber-blue text-cyber-dark' 
                          : 'text-cyber-light hover:bg-cyber-blue/10'
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={`text-cyber-light hover:bg-cyber-blue/10 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CardsLinkables;
