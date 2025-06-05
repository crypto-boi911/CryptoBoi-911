
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
    { id: 1, card: 'Platinum Visa', limit: '$1,500', type: 'Credit', features: 'Rewards, Low APR', price: '$75' },
    { id: 2, card: 'Gold Mastercard', limit: '$1,250', type: 'Debit', features: 'Cashback, Travel', price: '$65' },
    { id: 3, card: 'Amex Black Card', limit: '$1,400', type: 'Credit', features: 'Exclusive, Concierge', price: '$72' },
    { id: 4, card: 'Virtual Visa Card', limit: '$800', type: 'Virtual', features: 'Online Use', price: '$52' },
    { id: 5, card: 'Prepaid Mastercard', limit: '$600', type: 'Prepaid', features: 'Reloadable', price: '$48' },
    { id: 6, card: 'Business Platinum', limit: '$1,350', type: 'Credit', features: 'Business Rewards', price: '$68' },
    { id: 7, card: 'Student Debit Card', limit: '$500', type: 'Debit', features: 'No Fees', price: '$45' },
    { id: 8, card: 'Travel Rewards Visa', limit: '$1,200', type: 'Credit', features: 'Travel Points', price: '$62' },
    { id: 9, card: 'Classic Credit Card', limit: '$900', type: 'Credit', features: 'Standard Features', price: '$56' },
    { id: 10, card: 'Premium Debit', limit: '$1,100', type: 'Debit', features: 'Premium Access', price: '$60' },
    { id: 11, card: 'Express Visa', limit: '$750', type: 'Credit', features: 'Fast Approval', price: '$51' },
    { id: 12, card: 'Secure Mastercard', limit: '$1,000', type: 'Credit', features: 'Security Focus', price: '$58' },
    { id: 13, card: 'Quick Card', limit: '$650', type: 'Debit', features: 'Quick Access', price: '$49' },
    { id: 14, card: 'Elite Visa', limit: '$1,450', type: 'Credit', features: 'Elite Benefits', price: '$73' },
    { id: 15, card: 'Smart Card', limit: '$850', type: 'Virtual', features: 'Smart Features', price: '$54' },
    { id: 16, card: 'Pro Mastercard', limit: '$1,300', type: 'Credit', features: 'Pro Features', price: '$67' },
    { id: 17, card: 'Basic Prepaid', limit: '$400', type: 'Prepaid', features: 'Basic Access', price: '$46' },
    { id: 18, card: 'Advanced Visa', limit: '$1,150', type: 'Credit', features: 'Advanced Tools', price: '$61' },
    { id: 19, card: 'Speed Card', limit: '$700', type: 'Debit', features: 'Speed Processing', price: '$50' },
    { id: 20, card: 'Power Mastercard', limit: '$1,250', type: 'Credit', features: 'Power Features', price: '$64' },
    { id: 21, card: 'Flash Visa', limit: '$800', type: 'Virtual', features: 'Flash Speed', price: '$53' },
    { id: 22, card: 'Turbo Card', limit: '$950', type: 'Credit', features: 'Turbo Mode', price: '$57' },
    { id: 23, card: 'Lightning Mastercard', limit: '$1,100', type: 'Credit', features: 'Lightning Fast', price: '$59' },
    { id: 24, card: 'Rapid Debit', limit: '$750', type: 'Debit', features: 'Rapid Access', price: '$51' },
    { id: 25, card: 'Swift Visa', limit: '$1,200', type: 'Credit', features: 'Swift Processing', price: '$63' },
    { id: 26, card: 'Boost Card', limit: '$650', type: 'Virtual', features: 'Boost Features', price: '$48' },
    { id: 27, card: 'Velocity Mastercard', limit: '$1,350', type: 'Credit', features: 'High Velocity', price: '$69' },
    { id: 28, card: 'Rocket Prepaid', limit: '$550', type: 'Prepaid', features: 'Rocket Speed', price: '$47' },
    { id: 29, card: 'Zoom Visa', limit: '$1,000', type: 'Credit', features: 'Zoom Features', price: '$58' },
    { id: 30, card: 'Dash Card', limit: '$850', type: 'Debit', features: 'Dash Mode', price: '$54' },
    { id: 31, card: 'Sprint Mastercard', limit: '$1,150', type: 'Credit', features: 'Sprint Access', price: '$61' },
    { id: 32, card: 'Rush Visa', limit: '$700', type: 'Virtual', features: 'Rush Processing', price: '$50' },
    { id: 33, card: 'Blitz Card', limit: '$1,300', type: 'Credit', features: 'Blitz Speed', price: '$66' },
    { id: 34, card: 'Storm Mastercard', limit: '$900', type: 'Credit', features: 'Storm Power', price: '$56' },
    { id: 35, card: 'Thunder Debit', limit: '$1,050', type: 'Debit', features: 'Thunder Force', price: '$59' },
    { id: 36, card: 'Bolt Visa', limit: '$800', type: 'Virtual', features: 'Bolt Features', price: '$52' },
    { id: 37, card: 'Strike Card', limit: '$1,200', type: 'Credit', features: 'Strike Mode', price: '$63' },
    { id: 38, card: 'Shock Mastercard', limit: '$750', type: 'Prepaid', features: 'Shock Value', price: '$51' },
    { id: 39, card: 'Pulse Visa', limit: '$1,400', type: 'Credit', features: 'Pulse Features', price: '$71' },
    { id: 40, card: 'Beat Card', limit: '$650', type: 'Debit', features: 'Beat Mode', price: '$49' },
    { id: 41, card: 'Rhythm Mastercard', limit: '$1,100', type: 'Credit', features: 'Rhythm Flow', price: '$60' },
    { id: 42, card: 'Flow Visa', limit: '$850', type: 'Virtual', features: 'Flow State', price: '$54' },
    { id: 43, card: 'Stream Card', limit: '$1,250', type: 'Credit', features: 'Stream Mode', price: '$65' },
    { id: 44, card: 'Wave Mastercard', limit: '$700', type: 'Debit', features: 'Wave Power', price: '$50' },
    { id: 45, card: 'Current Visa', limit: '$1,350', type: 'Credit', features: 'Current Flow', price: '$68' },
    { id: 46, card: 'Tide Card', limit: '$600', type: 'Prepaid', features: 'Tide Features', price: '$48' },
    { id: 47, card: 'Surge Mastercard', limit: '$1,150', type: 'Credit', features: 'Surge Power', price: '$61' },
    { id: 48, card: 'Peak Visa', limit: '$950', type: 'Credit', features: 'Peak Performance', price: '$57' },
    { id: 49, card: 'Summit Card', limit: '$1,000', type: 'Virtual', features: 'Summit Access', price: '$58' },
    { id: 50, card: 'Apex Mastercard', limit: '$800', type: 'Debit', features: 'Apex Features', price: '$53' },
    { id: 51, card: 'Crown Visa', limit: '$1,300', type: 'Credit', features: 'Crown Features', price: '$67' },
    { id: 52, card: 'Royal Card', limit: '$750', type: 'Credit', features: 'Royal Treatment', price: '$51' },
    { id: 53, card: 'Noble Mastercard', limit: '$1,200', type: 'Credit', features: 'Noble Service', price: '$63' },
    { id: 54, card: 'Elite Max Visa', limit: '$650', type: 'Prepaid', features: 'Elite Maximum', price: '$49' },
    { id: 55, card: 'Prime Card', limit: '$1,450', type: 'Credit', features: 'Prime Access', price: '$74' },
    { id: 56, card: 'First Mastercard', limit: '$900', type: 'Debit', features: 'First Class', price: '$56' },
    { id: 57, card: 'Chief Visa', limit: '$1,100', type: 'Credit', features: 'Chief Benefits', price: '$60' },
    { id: 58, card: 'Master Card Pro', limit: '$850', type: 'Virtual', features: 'Master Level', price: '$54' },
    { id: 59, card: 'Expert Mastercard', limit: '$1,250', type: 'Credit', features: 'Expert Tools', price: '$65' },
    { id: 60, card: 'Pro Visa Plus', limit: '$700', type: 'Debit', features: 'Pro Features', price: '$50' },
    { id: 61, card: 'Ace Card', limit: '$1,350', type: 'Credit', features: 'Ace Benefits', price: '$68' },
    { id: 62, card: 'Star Mastercard', limit: '$600', type: 'Prepaid', features: 'Star Quality', price: '$48' },
    { id: 63, card: 'Legend Visa', limit: '$1,500', type: 'Credit', features: 'Legendary', price: '$75' },
    { id: 64, card: 'Hero Card', limit: '$950', type: 'Credit', features: 'Hero Features', price: '$57' },
    { id: 65, card: 'Champion Mastercard', limit: '$1,150', type: 'Credit', features: 'Champion Level', price: '$61' },
    { id: 66, card: 'Winner Visa', limit: '$800', type: 'Virtual', features: 'Winner Circle', price: '$52' },
    { id: 67, card: 'Victory Card', limit: '$1,200', type: 'Credit', features: 'Victory Access', price: '$63' },
    { id: 68, card: 'Success Mastercard', limit: '$750', type: 'Debit', features: 'Success Tools', price: '$51' },
    { id: 69, card: 'Triumph Visa', limit: '$1,000', type: 'Credit', features: 'Triumph Mode', price: '$58' },
    { id: 70, card: 'Glory Card', limit: '$650', type: 'Prepaid', features: 'Glory Features', price: '$49' },
    { id: 71, card: 'Honor Mastercard', limit: '$1,400', type: 'Credit', features: 'Honor System', price: '$71' },
    { id: 72, card: 'Pride Visa', limit: '$850', type: 'Credit', features: 'Pride Benefits', price: '$54' },
    { id: 73, card: 'Spirit Card', limit: '$1,250', type: 'Credit', features: 'Spirit Mode', price: '$65' },
    { id: 74, card: 'Soul Mastercard', limit: '$700', type: 'Virtual', features: 'Soul Connection', price: '$50' },
    { id: 75, card: 'Heart Visa', limit: '$1,350', type: 'Credit', features: 'Heart Features', price: '$68' },
    { id: 76, card: 'Mind Card', limit: '$900', type: 'Debit', features: 'Mind Tools', price: '$56' },
    { id: 77, card: 'Brain Mastercard', limit: '$1,100', type: 'Credit', features: 'Brain Power', price: '$60' },
    { id: 78, card: 'Genius Visa', limit: '$800', type: 'Credit', features: 'Genius Level', price: '$53' },
    { id: 79, card: 'Smart Card Pro', limit: '$1,200', type: 'Credit', features: 'Smart Features', price: '$63' },
    { id: 80, card: 'Wise Mastercard', limit: '$750', type: 'Prepaid', features: 'Wise Choices', price: '$51' },
    { id: 81, card: 'Clever Visa', limit: '$1,300', type: 'Credit', features: 'Clever Tools', price: '$67' },
    { id: 82, card: 'Bright Card', limit: '$650', type: 'Virtual', features: 'Bright Ideas', price: '$49' },
    { id: 83, card: 'Sharp Mastercard', limit: '$1,450', type: 'Credit', features: 'Sharp Features', price: '$74' },
    { id: 84, card: 'Quick Visa Plus', limit: '$950', type: 'Debit', features: 'Quick Plus', price: '$57' },
    { id: 85, card: 'Fast Card Pro', limit: '$1,150', type: 'Credit', features: 'Fast Pro', price: '$61' },
    { id: 86, card: 'Rapid Mastercard Max', limit: '$850', type: 'Credit', features: 'Rapid Max', price: '$54' },
    { id: 87, card: 'Swift Visa Elite', limit: '$1,250', type: 'Credit', features: 'Swift Elite', price: '$65' },
    { id: 88, card: 'Speed Card Gold', limit: '$700', type: 'Prepaid', features: 'Speed Gold', price: '$50' },
    { id: 89, card: 'Velocity Visa Pro', limit: '$1,350', type: 'Credit', features: 'Velocity Pro', price: '$68' },
    { id: 90, card: 'Turbo Mastercard Max', limit: '$800', type: 'Virtual', features: 'Turbo Max', price: '$52' },
    { id: 91, card: 'Boost Visa Elite', limit: '$1,200', type: 'Credit', features: 'Boost Elite', price: '$63' },
    { id: 92, card: 'Power Card Gold', limit: '$900', type: 'Debit', features: 'Power Gold', price: '$56' },
    { id: 93, card: 'Force Mastercard Pro', limit: '$1,100', type: 'Credit', features: 'Force Pro', price: '$60' },
    { id: 94, card: 'Energy Visa Max', limit: '$750', type: 'Credit', features: 'Energy Max', price: '$51' },
    { id: 95, card: 'Fuel Card Elite', limit: '$1,400', type: 'Credit', features: 'Fuel Elite', price: '$71' },
    { id: 96, card: 'Fire Mastercard Gold', limit: '$650', type: 'Prepaid', features: 'Fire Gold', price: '$49' },
    { id: 97, card: 'Blaze Visa Pro', limit: '$1,300', type: 'Credit', features: 'Blaze Pro', price: '$67' },
    { id: 98, card: 'Flame Card Max', limit: '$850', type: 'Virtual', features: 'Flame Max', price: '$54' },
    { id: 99, card: 'Spark Mastercard Elite', limit: '$1,150', type: 'Credit', features: 'Spark Elite', price: '$61' },
    { id: 100, card: 'Ignite Visa Gold', limit: '$1,000', type: 'Credit', features: 'Ignite Gold', price: '$58' },
    { id: 101, card: 'Burn Card Pro', limit: '$950', type: 'Debit', features: 'Burn Pro', price: '$57' },
    { id: 102, card: 'Heat Mastercard Max', limit: '$700', type: 'Credit', features: 'Heat Max', price: '$50' },
    { id: 103, card: 'Scorch Visa Elite', limit: '$1,500', type: 'Credit', features: 'Scorch Elite', price: '$75' },
    { id: 104, card: 'Sear Card Gold', limit: '$800', type: 'Virtual', features: 'Sear Gold', price: '$53' },
    { id: 105, card: 'Torch Mastercard Pro', limit: '$1,250', type: 'Credit', features: 'Torch Pro', price: '$65' },
    { id: 106, card: 'Beam Visa Max', limit: '$600', type: 'Prepaid', features: 'Beam Max', price: '$48' },
    { id: 107, card: 'Shine Card Elite', limit: '$1,350', type: 'Credit', features: 'Shine Elite', price: '$68' },
    { id: 108, card: 'Glow Mastercard Gold', limit: '$750', type: 'Debit', features: 'Glow Gold', price: '$51' },
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
