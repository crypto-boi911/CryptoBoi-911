
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CashAppLogs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [minBalance, setMinBalance] = useState('');
  const [maxBalance, setMaxBalance] = useState('');
  const [selectedAccountTypes, setSelectedAccountTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const cashappProducts = [
    { id: 1, account: 'Verified Premium', balance: '$4,500', features: 'Bitcoin Ready', price: '$250' },
    { id: 2, account: 'Business Account', balance: '$3,500', features: 'High Limit', price: '$220' },
    { id: 3, account: 'Standard Account', balance: '$850', features: 'Basic Access', price: '$115' },
    { id: 4, account: 'Gold Verified', balance: '$2,500', features: 'Premium Features', price: '$180' },
    { id: 5, account: 'Pro Business', balance: '$4,200', features: 'Enterprise', price: '$240' },
    { id: 6, account: 'Plus Account', balance: '$1,850', features: 'Enhanced Security', price: '$160' },
    { id: 7, account: 'Elite Premium', balance: '$4,000', features: 'VIP Access', price: '$235' },
    { id: 8, account: 'Basic Verified', balance: '$750', features: 'Standard', price: '$110' },
    { id: 9, account: 'Advanced Premium', balance: '$3,800', features: 'Advanced Features', price: '$230' },
    { id: 10, account: 'Student Account', balance: '$650', features: 'Student Benefits', price: '$105' },
    { id: 11, account: 'Business Pro', balance: '$4,300', features: 'Professional Tools', price: '$245' },
    { id: 12, account: 'Silver Verified', balance: '$1,200', features: 'Silver Benefits', price: '$135' },
    { id: 13, account: 'Express Account', balance: '$2,800', features: 'Quick Access', price: '$195' },
    { id: 14, account: 'Platinum Plus', balance: '$4,100', features: 'Platinum Features', price: '$238' },
    { id: 15, account: 'Bronze Basic', balance: '$900', features: 'Entry Level', price: '$120' },
    { id: 16, account: 'Rapid Transfer', balance: '$3,200', features: 'Fast Transfers', price: '$210' },
    { id: 17, account: 'Secure Premium', balance: '$3,600', features: 'Security Focus', price: '$225' },
    { id: 18, account: 'Quick Cash', balance: '$1,500', features: 'Instant Access', price: '$148' },
    { id: 19, account: 'Power User', balance: '$4,400', features: 'Power Features', price: '$248' },
    { id: 20, account: 'Smart Account', balance: '$2,100', features: 'Smart Tools', price: '$170' },
    { id: 21, account: 'Flash Premium', balance: '$3,900', features: 'Flash Speed', price: '$232' },
    { id: 22, account: 'Turbo Cash', balance: '$1,800', features: 'Turbo Mode', price: '$158' },
    { id: 23, account: 'Lightning Fast', balance: '$4,250', features: 'Lightning Speed', price: '$243' },
    { id: 24, account: 'Speed Account', balance: '$2,400', features: 'Speed Focus', price: '$178' },
    { id: 25, account: 'Velocity Plus', balance: '$3,750', features: 'High Velocity', price: '$228' },
    { id: 26, account: 'Rocket Cash', balance: '$1,350', features: 'Rocket Speed', price: '$143' },
    { id: 27, account: 'Boost Premium', balance: '$4,050', features: 'Boosted Features', price: '$236' },
    { id: 28, account: 'Dash Account', balance: '$2,700', features: 'Quick Dash', price: '$188' },
    { id: 29, account: 'Sprint Cash', balance: '$3,300', features: 'Sprint Mode', price: '$213' },
    { id: 30, account: 'Rush Premium', balance: '$1,650', features: 'Rush Access', price: '$153' },
    { id: 31, account: 'Zoom Account', balance: '$4,350', features: 'Zoom Features', price: '$246' },
    { id: 32, account: 'Blitz Cash', balance: '$2,950', features: 'Blitz Speed', price: '$198' },
    { id: 33, account: 'Fury Premium', balance: '$3,150', features: 'Fury Mode', price: '$208' },
    { id: 34, account: 'Storm Account', balance: '$1,450', features: 'Storm Power', price: '$146' },
    { id: 35, account: 'Thunder Cash', balance: '$4,150', features: 'Thunder Speed', price: '$240' },
    { id: 36, account: 'Bolt Premium', balance: '$2,550', features: 'Bolt Features', price: '$183' },
    { id: 37, account: 'Strike Account', balance: '$3,850', features: 'Strike Mode', price: '$231' },
    { id: 38, account: 'Shock Cash', balance: '$1,750', features: 'Shock Value', price: '$156' },
    { id: 39, account: 'Pulse Premium', balance: '$4,000', features: 'Pulse Features', price: '$235' },
    { id: 40, account: 'Beat Account', balance: '$2,200', features: 'Beat Mode', price: '$173' },
    { id: 41, account: 'Rhythm Cash', balance: '$3,500', features: 'Rhythm Flow', price: '$221' },
    { id: 42, account: 'Flow Premium', balance: '$1,950', features: 'Flow State', price: '$166' },
    { id: 43, account: 'Stream Account', balance: '$4,250', features: 'Stream Mode', price: '$243' },
    { id: 44, account: 'Wave Cash', balance: '$2,350', features: 'Wave Power', price: '$176' },
    { id: 45, account: 'Current Premium', balance: '$3,700', features: 'Current Flow', price: '$227' },
    { id: 46, account: 'Tide Account', balance: '$1,550', features: 'Tide Features', price: '$151' },
    { id: 47, account: 'Surge Cash', balance: '$4,100', features: 'Surge Power', price: '$238' },
    { id: 48, account: 'Peak Premium', balance: '$2,800', features: 'Peak Performance', price: '$193' },
    { id: 49, account: 'Summit Account', balance: '$3,400', features: 'Summit Access', price: '$216' },
    { id: 50, account: 'Apex Cash', balance: '$1,250', features: 'Apex Features', price: '$138' },
    { id: 51, account: 'Crown Premium', balance: '$4,300', features: 'Crown Features', price: '$244' },
    { id: 52, account: 'Royal Account', balance: '$2,650', features: 'Royal Treatment', price: '$186' },
    { id: 53, account: 'Noble Cash', balance: '$3,250', features: 'Noble Service', price: '$211' },
    { id: 54, account: 'Elite Max', balance: '$1,850', features: 'Elite Maximum', price: '$163' },
    { id: 55, account: 'Prime Premium', balance: '$4,200', features: 'Prime Access', price: '$241' },
    { id: 56, account: 'First Account', balance: '$2,450', features: 'First Class', price: '$181' },
    { id: 57, account: 'Chief Cash', balance: '$3,800', features: 'Chief Benefits', price: '$230' },
    { id: 58, account: 'Master Premium', balance: '$1,400', features: 'Master Level', price: '$145' },
    { id: 59, account: 'Expert Account', balance: '$4,050', features: 'Expert Tools', price: '$236' },
    { id: 60, account: 'Pro Cash', balance: '$2,750', features: 'Pro Features', price: '$191' },
    { id: 61, account: 'Ace Premium', balance: '$3,550', features: 'Ace Benefits', price: '$223' },
    { id: 62, account: 'Star Account', balance: '$1,700', features: 'Star Quality', price: '$157' },
    { id: 63, account: 'Legend Cash', balance: '$4,400', features: 'Legendary', price: '$248' },
    { id: 64, account: 'Hero Premium', balance: '$2,300', features: 'Hero Features', price: '$174' },
    { id: 65, account: 'Champion Account', balance: '$3,950', features: 'Champion Level', price: '$234' },
    { id: 66, account: 'Winner Cash', balance: '$1,600', features: 'Winner Circle', price: '$152' },
    { id: 67, account: 'Victory Premium', balance: '$4,150', features: 'Victory Access', price: '$240' },
    { id: 68, account: 'Success Account', balance: '$2,900', features: 'Success Tools', price: '$196' },
    { id: 69, account: 'Triumph Cash', balance: '$3,100', features: 'Triumph Mode', price: '$206' },
    { id: 70, account: 'Glory Premium', balance: '$1,150', features: 'Glory Features', price: '$133' },
    { id: 71, account: 'Honor Account', balance: '$4,350', features: 'Honor System', price: '$246' },
    { id: 72, account: 'Pride Cash', balance: '$2,550', features: 'Pride Benefits', price: '$184' },
    { id: 73, account: 'Spirit Premium', balance: '$3,650', features: 'Spirit Mode', price: '$226' },
    { id: 74, account: 'Soul Account', balance: '$1,350', features: 'Soul Connection', price: '$142' },
    { id: 75, account: 'Heart Cash', balance: '$4,250', features: 'Heart Features', price: '$243' },
    { id: 76, account: 'Mind Premium', balance: '$2,150', features: 'Mind Tools', price: '$171' },
    { id: 77, account: 'Brain Account', balance: '$3,450', features: 'Brain Power', price: '$218' },
    { id: 78, account: 'Genius Cash', balance: '$1,950', features: 'Genius Level', price: '$167' },
    { id: 79, account: 'Smart Premium', balance: '$4,100', features: 'Smart Features', price: '$238' },
    { id: 80, account: 'Wise Account', balance: '$2,850', features: 'Wise Choices', price: '$194' },
    { id: 81, account: 'Clever Cash', balance: '$3,350', features: 'Clever Tools', price: '$214' },
    { id: 82, account: 'Bright Premium', balance: '$1,500', features: 'Bright Ideas', price: '$149' },
    { id: 83, account: 'Sharp Account', balance: '$4,200', features: 'Sharp Features', price: '$241' },
    { id: 84, account: 'Quick Cash Plus', balance: '$2,700', features: 'Quick Plus', price: '$189' },
    { id: 85, account: 'Fast Premium Pro', balance: '$3,750', features: 'Fast Pro', price: '$229' },
    { id: 86, account: 'Rapid Account Max', balance: '$1,800', features: 'Rapid Max', price: '$161' },
    { id: 87, account: 'Swift Cash Elite', balance: '$4,050', features: 'Swift Elite', price: '$237' },
    { id: 88, account: 'Speed Premium Gold', balance: '$2,400', features: 'Speed Gold', price: '$177' },
    { id: 89, account: 'Velocity Account Pro', balance: '$3,600', features: 'Velocity Pro', price: '$224' },
    { id: 90, account: 'Turbo Cash Max', balance: '$1,300', features: 'Turbo Max', price: '$141' },
    { id: 91, account: 'Boost Premium Elite', balance: '$4,300', features: 'Boost Elite', price: '$244' },
    { id: 92, account: 'Power Account Gold', balance: '$2,600', features: 'Power Gold', price: '$187' },
    { id: 93, account: 'Force Cash Pro', balance: '$3,200', features: 'Force Pro', price: '$210' },
    { id: 94, account: 'Energy Premium Max', balance: '$1,650', features: 'Energy Max', price: '$154' },
    { id: 95, account: 'Fuel Account Elite', balance: '$4,150', features: 'Fuel Elite', price: '$240' },
    { id: 96, account: 'Fire Cash Gold', balance: '$2,250', features: 'Fire Gold', price: '$175' },
    { id: 97, account: 'Blaze Premium Pro', balance: '$3,900', features: 'Blaze Pro', price: '$233' },
    { id: 98, account: 'Flame Account Max', balance: '$1,750', features: 'Flame Max', price: '$158' },
    { id: 99, account: 'Spark Cash Elite', balance: '$4,250', features: 'Spark Elite', price: '$243' },
    { id: 100, account: 'Ignite Premium Gold', balance: '$2,500', features: 'Ignite Gold', price: '$182' },
    { id: 101, account: 'Burn Account Pro', balance: '$3,800', features: 'Burn Pro', price: '$231' },
    { id: 102, account: 'Heat Cash Max', balance: '$1,450', features: 'Heat Max', price: '$147' },
    { id: 103, account: 'Scorch Premium Elite', balance: '$4,400', features: 'Scorch Elite', price: '$248' },
    { id: 104, account: 'Sear Account Gold', balance: '$2,800', features: 'Sear Gold', price: '$192' },
    { id: 105, account: 'Torch Cash Pro', balance: '$3,500', features: 'Torch Pro', price: '$221' },
    { id: 106, account: 'Beam Premium Max', balance: '$1,100', features: 'Beam Max', price: '$131' },
    { id: 107, account: 'Shine Account Elite', balance: '$4,350', features: 'Shine Elite', price: '$246' },
    { id: 108, account: 'Glow Cash Gold', balance: '$2,350', features: 'Glow Gold', price: '$176' },
  ];

  const accountTypes = ['Verified', 'Business', 'Standard', 'Gold', 'Pro', 'Plus', 'Elite', 'Basic'];

  // Helper function to convert balance string to number
  const parseBalance = (balanceStr: string) => {
    return parseInt(balanceStr.replace(/[$,]/g, ''));
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = cashappProducts.filter(product => {
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
      
      return matchesSearch && matchesBalance && matchesType;
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
  }, [searchTerm, minBalance, maxBalance, selectedAccountTypes, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minBalance, maxBalance, selectedAccountTypes, sortBy]);

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.account} CashApp account has been added to your cart.`,
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

  const clearFilters = () => {
    setSearchTerm('');
    setMinBalance('');
    setMaxBalance('');
    setSelectedAccountTypes([]);
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
            CashApp Logs
          </h1>
          <p className="text-cyber-light/60">
            Mobile payment platform logs with instant access capabilities ({filteredProducts.length} available)
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
              No CashApp accounts found matching your criteria
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

export default CashAppLogs;
