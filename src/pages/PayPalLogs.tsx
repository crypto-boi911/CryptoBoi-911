
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Shield, DollarSign, ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
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
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const paypalProducts = [
    { id: 1, account: 'Business Verified', balance: '$4,500', status: 'Verified', price: '$250' },
    { id: 2, account: 'Personal Premium', balance: '$2,250', status: 'Verified', price: '$175' },
    { id: 3, account: 'Business Standard', balance: '$3,750', status: 'Limited', price: '$225' },
    { id: 4, account: 'Personal Basic', balance: '$875', status: 'Verified', price: '$125' },
    { id: 5, account: 'Business Pro', balance: '$4,200', status: 'Verified', price: '$240' },
    { id: 6, account: 'Personal Plus', balance: '$1,550', status: 'Limited', price: '$150' },
    { id: 7, account: 'Business Elite', balance: '$4,000', status: 'Verified', price: '$235' },
    { id: 8, account: 'Personal Standard', balance: '$1,200', status: 'Verified', price: '$140' },
    { id: 9, account: 'Business Starter', balance: '$2,800', status: 'Verified', price: '$190' },
    { id: 10, account: 'Personal Gold', balance: '$3,200', status: 'Verified', price: '$210' },
    { id: 11, account: 'Business Advanced', balance: '$4,300', status: 'Limited', price: '$245' },
    { id: 12, account: 'Personal Silver', balance: '$1,800', status: 'Verified', price: '$160' },
    { id: 13, account: 'Business Express', balance: '$3,500', status: 'Verified', price: '$220' },
    { id: 14, account: 'Personal Quick', balance: '$950', status: 'Limited', price: '$130' },
    { id: 15, account: 'Business Rapid', balance: '$4,100', status: 'Verified', price: '$238' },
    { id: 16, account: 'Personal Fast', balance: '$2,100', status: 'Verified', price: '$170' },
    { id: 17, account: 'Business Swift', balance: '$3,900', status: 'Limited', price: '$232' },
    { id: 18, account: 'Personal Instant', balance: '$1,400', status: 'Verified', price: '$145' },
    { id: 19, account: 'Business Turbo', balance: '$4,400', status: 'Verified', price: '$248' },
    { id: 20, account: 'Personal Lightning', balance: '$2,600', status: 'Limited', price: '$185' },
    { id: 21, account: 'Business Flash', balance: '$3,100', status: 'Verified', price: '$205' },
    { id: 22, account: 'Personal Bolt', balance: '$1,650', status: 'Verified', price: '$155' },
    { id: 23, account: 'Business Zoom', rapid: '$3,800', status: 'Limited', price: '$230' },
    { id: 24, account: 'Personal Speed', balance: '$1,100', status: 'Verified', price: '$135' },
    { id: 25, account: 'Business Velocity', balance: '$4,350', status: 'Verified', price: '$246' },
    { id: 26, account: 'Personal Rocket', balance: '$2,450', status: 'Limited', price: '$180' },
    { id: 27, account: 'Business Jet', balance: '$3,650', status: 'Verified', price: '$227' },
    { id: 28, account: 'Personal Comet', balance: '$1,750', status: 'Verified', price: '$158' },
    { id: 29, account: 'Business Meteor', balance: '$4,150', status: 'Limited', price: '$241' },
    { id: 30, account: 'Personal Star', balance: '$2,300', status: 'Verified', price: '$173' },
    { id: 31, account: 'Business Galaxy', balance: '$3,450', status: 'Verified', price: '$218' },
    { id: 32, account: 'Personal Moon', balance: '$1,350', status: 'Limited', price: '$143' },
    { id: 33, account: 'Business Solar', balance: '$4,250', status: 'Verified', price: '$243' },
    { id: 34, account: 'Personal Lunar', balance: '$2,050', status: 'Verified', price: '$168' },
    { id: 35, account: 'Business Cosmic', balance: '$3,750', status: 'Limited', price: '$228' },
    { id: 36, account: 'Personal Stellar', balance: '$1,500', status: 'Verified', price: '$148' },
    { id: 37, account: 'Business Aurora', balance: '$4,050', status: 'Verified', price: '$236' },
    { id: 38, account: 'Personal Eclipse', balance: '$2,700', status: 'Limited', price: '$188' },
    { id: 39, account: 'Business Nebula', balance: '$3,300', status: 'Verified', price: '$213' },
    { id: 40, account: 'Personal Orbit', balance: '$1,250', status: 'Verified', price: '$138' },
    { id: 41, account: 'Business Quantum', balance: '$4,450', status: 'Limited', price: '$249' },
    { id: 42, account: 'Personal Atom', balance: '$2,850', status: 'Verified', price: '$193' },
    { id: 43, account: 'Business Proton', balance: '$3,550', status: 'Verified', price: '$223' },
    { id: 44, account: 'Personal Electron', balance: '$1,450', status: 'Limited', price: '$146' },
    { id: 45, account: 'Business Neutron', balance: '$4,350', status: 'Verified', price: '$247' },
    { id: 46, account: 'Personal Photon', balance: '$2,150', status: 'Verified', price: '$171' },
    { id: 47, account: 'Business Plasma', balance: '$3,850', status: 'Limited', price: '$233' },
    { id: 48, account: 'Personal Energy', balance: '$1,850', status: 'Verified', price: '$163' },
    { id: 49, account: 'Business Power', balance: '$4,200', status: 'Verified', price: '$242' },
    { id: 50, account: 'Personal Force', balance: '$2,400', status: 'Limited', price: '$178' },
    { id: 51, account: 'Business Thunder', balance: '$3,700', status: 'Verified', price: '$229' },
    { id: 52, account: 'Personal Lightning Pro', balance: '$1,300', status: 'Verified', price: '$141' },
    { id: 53, account: 'Business Storm', balance: '$4,100', status: 'Limited', price: '$239' },
    { id: 54, account: 'Personal Rain', balance: '$2,500', status: 'Verified', price: '$183' },
    { id: 55, account: 'Business Tempest', balance: '$3,400', status: 'Verified', price: '$216' },
    { id: 56, account: 'Personal Breeze', balance: '$1,150', status: 'Limited', price: '$133' },
    { id: 57, account: 'Business Cyclone', balance: '$4,300', status: 'Verified', price: '$244' },
    { id: 58, account: 'Personal Gale', balance: '$2,200', status: 'Verified', price: '$174' },
    { id: 59, account: 'Business Hurricane', balance: '$3,950', status: 'Limited', price: '$234' },
    { id: 60, account: 'Personal Tornado', balance: '$1,600', status: 'Verified', price: '$153' },
    { id: 61, account: 'Business Typhoon', balance: '$4,450', status: 'Verified', price: '$250' },
    { id: 62, account: 'Personal Whirlwind', balance: '$2,750', status: 'Limited', price: '$191' },
    { id: 63, account: 'Business Tsunami', balance: '$3,250', status: 'Verified', price: '$211' },
    { id: 64, account: 'Personal Wave', balance: '$1,450', status: 'Verified', price: '$147' },
    { id: 65, account: 'Business Ocean', balance: '$4,150', status: 'Limited', price: '$240' },
    { id: 66, account: 'Personal Sea', balance: '$2,350', status: 'Verified', price: '$176' },
    { id: 67, account: 'Business River', balance: '$3,600', status: 'Verified', price: '$225' },
    { id: 68, account: 'Personal Stream', balance: '$1,700', status: 'Limited', price: '$156' },
    { id: 69, account: 'Business Lake', balance: '$4,250', status: 'Verified', price: '$245' },
    { id: 70, account: 'Personal Pond', balance: '$2,050', status: 'Verified', price: '$169' },
    { id: 71, account: 'Business Mountain', balance: '$3,800', status: 'Limited', price: '$231' },
    { id: 72, account: 'Personal Hill', balance: '$1,350', status: 'Verified', price: '$144' },
    { id: 73, account: 'Business Peak', balance: '$4,400', status: 'Verified', price: '$248' },
    { id: 74, account: 'Personal Valley', balance: '$2,650', status: 'Limited', price: '$186' },
    { id: 75, account: 'Business Canyon', balance: '$3,150', status: 'Verified', price: '$208' },
    { id: 76, account: 'Personal Ridge', balance: '$1,550', status: 'Verified', price: '$151' },
    { id: 77, account: 'Business Cliff', balance: '$4,050', status: 'Limited', price: '$237' },
    { id: 78, account: 'Personal Rock', balance: '$2,250', status: 'Verified', price: '$175' },
    { id: 79, account: 'Business Stone', balance: '$3,750', status: 'Verified', price: '$230' },
    { id: 80, account: 'Personal Pebble', balance: '$1,200', status: 'Limited', price: '$139' },
    { id: 81, account: 'Business Crystal', balance: '$4,350', status: 'Verified', price: '$246' },
    { id: 82, account: 'Personal Diamond', balance: '$2,800', status: 'Verified', price: '$192' },
    { id: 83, account: 'Business Emerald', balance: '$3,500', status: 'Limited', price: '$221' },
    { id: 84, account: 'Personal Ruby', balance: '$1,400', status: 'Verified', price: '$145' },
    { id: 85, account: 'Business Sapphire', balance: '$4,200', status: 'Verified', price: '$241' },
    { id: 86, account: 'Personal Topaz', balance: '$2,100', status: 'Limited', price: '$172' },
    { id: 87, account: 'Business Opal', balance: '$3,900', status: 'Verified', price: '$235' },
    { id: 88, account: 'Personal Amber', balance: '$1,800', status: 'Verified', price: '$161' },
    { id: 89, account: 'Business Quartz', balance: '$4,100', status: 'Limited', price: '$238' },
    { id: 90, account: 'Personal Jade', balance: '$2,450', status: 'Verified', price: '$181' },
    { id: 91, account: 'Business Onyx', balance: '$3,350', status: 'Verified', price: '$214' },
    { id: 92, account: 'Personal Pearl', balance: '$1,650', status: 'Limited', price: '$154' },
    { id: 93, account: 'Business Coral', balance: '$4,250', status: 'Verified', price: '$244' },
    { id: 94, account: 'Personal Shell', balance: '$2,550', status: 'Verified', price: '$184' },
    { id: 95, account: 'Business Ivory', balance: '$3,650', status: 'Limited', price: '$226' },
    { id: 96, account: 'Personal Marble', balance: '$1,750', status: 'Verified', price: '$159' },
    { id: 97, account: 'Business Granite', balance: '$4,150', status: 'Verified', price: '$240' },
    { id: 98, account: 'Personal Slate', balance: '$2,300', status: 'Limited', price: '$177' },
    { id: 99, account: 'Business Limestone', balance: '$3,800', status: 'Verified', price: '$232' },
    { id: 100, account: 'Personal Sandstone', balance: '$1,500', status: 'Verified', price: '$149' },
    { id: 101, account: 'Business Obsidian', balance: '$4,400', status: 'Limited', price: '$249' },
    { id: 102, account: 'Personal Flint', balance: '$2,700', status: 'Verified', price: '$189' },
    { id: 103, account: 'Business Basalt', balance: '$3,200', status: 'Verified', price: '$209' },
    { id: 104, account: 'Personal Pumice', balance: '$1,100', status: 'Limited', price: '$131' },
    { id: 105, account: 'Business Shale', balance: '$4,300', status: 'Verified', price: '$243' },
    { id: 106, account: 'Personal Clay', balance: '$2,600', status: 'Verified', price: '$187' },
    { id: 107, account: 'Business Soil', balance: '$3,450', status: 'Limited', price: '$219' },
    { id: 108, account: 'Personal Sand', balance: '$1,250', status: 'Verified', price: '$137' },
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
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

export default PayPalLogs;
