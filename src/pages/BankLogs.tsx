import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Search, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const BankLogs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [minBalance, setMinBalance] = useState('');
  const [maxBalance, setMaxBalance] = useState('');
  const [selectedAccountTypes, setSelectedAccountTypes] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const bankProducts = [
    { id: 1, bank: 'Chase Bank', balance: '$25,000', type: 'Checking', price: '$250', country: 'USA', flag: '🇺🇸' },
    { id: 2, bank: 'Bank of America', balance: '$18,500', type: 'Savings', price: '$320', country: 'USA', flag: '🇺🇸' },
    { id: 3, bank: 'Wells Fargo', balance: '$32,000', type: 'Business', price: '$480', country: 'USA', flag: '🇺🇸' },
    { id: 4, bank: 'Citibank', balance: '$15,750', type: 'Checking', price: '$280', country: 'USA', flag: '🇺🇸' },
    { id: 5, bank: 'TD Bank', balance: '$42,000', type: 'Business', price: '$620', country: 'CAD', flag: '🇨🇦' },
    { id: 6, bank: 'PNC Bank', balance: '$28,300', type: 'Savings', price: '$420', country: 'USA', flag: '🇺🇸' },
    { id: 7, bank: 'US Bank', balance: '$19,800', type: 'Checking', price: '$340', country: 'USA', flag: '🇺🇸' },
    { id: 8, bank: 'Capital One', balance: '$36,500', type: 'Business', price: '$540', country: 'USA', flag: '🇺🇸' },
    { id: 9, bank: 'Truist Bank', balance: '$21,200', type: 'Savings', price: '$380', country: 'USA', flag: '🇺🇸' },
    { id: 10, bank: 'Fifth Third Bank', balance: '$33,700', type: 'Checking', price: '$460', country: 'USA', flag: '🇺🇸' },
    { id: 11, bank: 'Regions Bank', balance: '$27,900', type: 'Business', price: '$420', country: 'USA', flag: '🇺🇸' },
    { id: 12, bank: 'KeyBank', balance: '$16,400', type: 'Savings', price: '$300', country: 'USA', flag: '🇺🇸' },
    { id: 13, bank: 'M&T Bank', balance: '$38,600', type: 'Checking', price: '$520', country: 'USA', flag: '🇺🇸' },
    { id: 14, bank: 'Huntington Bank', balance: '$22,800', type: 'Business', price: '$390', country: 'USA', flag: '🇺🇸' },
    { id: 15, bank: 'Comerica Bank', balance: '$31,500', type: 'Savings', price: '$450', country: 'USA', flag: '🇺🇸' },
    { id: 16, bank: 'Zions Bank', balance: '$24,300', type: 'Checking', price: '$400', country: 'USA', flag: '🇺🇸' },
    { id: 17, bank: 'First National Bank', balance: '$29,700', type: 'Business', price: '$440', country: 'USA', flag: '🇺🇸' },
    { id: 18, bank: 'Synovus Bank', balance: '$17,600', type: 'Savings', price: '$320', country: 'USA', flag: '🇺🇸' },
    { id: 19, bank: 'Associated Bank', balance: '$35,200', type: 'Checking', price: '$480', country: 'USA', flag: '🇺🇸' },
    { id: 20, bank: 'Frost Bank', balance: '$26,800', type: 'Business', price: '$410', country: 'USA', flag: '🇺🇸' },
    { id: 21, bank: 'Santander Bank', balance: '$20,400', type: 'Savings', price: '$360', country: 'UK', flag: '🇬🇧' },
    { id: 22, bank: 'BMO Harris Bank', balance: '$34,100', type: 'Checking', price: '$470', country: 'CAD', flag: '🇨🇦' },
    { id: 23, bank: 'TCF Bank', balance: '$23,900', type: 'Business', price: '$390', country: 'USA', flag: '🇺🇸' },
    { id: 24, bank: 'Webster Bank', balance: '$30,600', type: 'Savings', price: '$440', country: 'USA', flag: '🇺🇸' },
    { id: 25, bank: 'Chase Bank', balance: '$45,800', type: 'Business', price: '$620', country: 'USA', flag: '🇺🇸' },
    { id: 26, bank: 'Bank of America', balance: '$12,300', type: 'Checking', price: '$240', country: 'USA', flag: '🇺🇸' },
    { id: 27, bank: 'Wells Fargo', balance: '$58,700', type: 'Savings', price: '$680', country: 'USA', flag: '🇺🇸' },
    { id: 28, bank: 'Citibank', balance: '$67,900', type: 'Business', price: '$720', country: 'UK', flag: '🇬🇧' },
    { id: 29, bank: 'TD Bank', balance: '$23,400', type: 'Checking', price: '$380', country: 'CAD', flag: '🇨🇦' },
    { id: 30, bank: 'PNC Bank', balance: '$41,200', type: 'Savings', price: '$560', country: 'USA', flag: '🇺🇸' },
    { id: 31, bank: 'US Bank', balance: '$56,800', type: 'Business', price: '$660', country: 'USA', flag: '🇺🇸' },
    { id: 32, bank: 'Capital One', balance: '$19,500', type: 'Checking', price: '$340', country: 'UK', flag: '🇬🇧' },
    { id: 33, bank: 'Truist Bank', balance: '$73,200', type: 'Business', price: '$750', country: 'USA', flag: '🇺🇸' },
    { id: 34, bank: 'Fifth Third Bank', balance: '$14,800', type: 'Savings', price: '$280', country: 'USA', flag: '🇺🇸' },
    { id: 35, bank: 'Regions Bank', balance: '$48,600', type: 'Checking', price: '$580', country: 'USA', flag: '🇺🇸' },
    { id: 36, bank: 'KeyBank', balance: '$52,100', type: 'Business', price: '$620', country: 'USA', flag: '🇺🇸' },
    { id: 37, bank: 'M&T Bank', balance: '$26,700', type: 'Savings', price: '$400', country: 'USA', flag: '🇺🇸' },
    { id: 38, bank: 'Huntington Bank', balance: '$39,400', type: 'Checking', price: '$520', country: 'USA', flag: '🇺🇸' },
    { id: 39, bank: 'Comerica Bank', balance: '$64,300', type: 'Business', price: '$700', country: 'USA', flag: '🇺🇸' },
    { id: 40, bank: 'Zions Bank', balance: '$18,900', type: 'Savings', price: '$340', country: 'USA', flag: '🇺🇸' },
    { id: 41, bank: 'First National Bank', balance: '$44,600', type: 'Checking', price: '$560', country: 'AUS', flag: '🇦🇺' },
    { id: 42, bank: 'Synovus Bank', balance: '$71,500', type: 'Business', price: '$740', country: 'USA', flag: '🇺🇸' },
    { id: 43, bank: 'Associated Bank', balance: '$22,100', type: 'Savings', price: '$380', country: 'USA', flag: '🇺🇸' },
    { id: 44, bank: 'Frost Bank', balance: '$55,800', type: 'Checking', price: '$640', country: 'USA', flag: '🇺🇸' },
    { id: 45, bank: 'Santander Bank', balance: '$37,200', type: 'Business', price: '$520', country: 'UK', flag: '🇬🇧' },
    { id: 46, bank: 'BMO Harris Bank', balance: '$16,700', type: 'Savings', price: '$300', country: 'CAD', flag: '🇨🇦' },
    { id: 47, bank: 'TCF Bank', balance: '$49,900', type: 'Checking', price: '$580', country: 'USA', flag: '🇺🇸' },
    { id: 48, bank: 'Webster Bank', balance: '$62,400', type: 'Business', price: '$680', country: 'USA', flag: '🇺🇸' },
    { id: 49, bank: 'Chase Bank', balance: '$33,100', type: 'Savings', price: '$460', country: 'UK', flag: '🇬🇧' },
    { id: 50, bank: 'Bank of America', balance: '$47,800', type: 'Checking', price: '$560', country: 'USA', flag: '🇺🇸' },
    { id: 51, bank: 'Wells Fargo', balance: '$29,300', type: 'Business', price: '$440', country: 'AUS', flag: '🇦🇺' },
    { id: 52, bank: 'Citibank', balance: '$54,600', type: 'Savings', price: '$620', country: 'UK', flag: '🇬🇧' },
    { id: 53, bank: 'TD Bank', balance: '$68,900', type: 'Checking', price: '$720', country: 'CAD', flag: '🇨🇦' },
    { id: 54, bank: 'PNC Bank', balance: '$21,500', type: 'Business', price: '$380', country: 'USA', flag: '🇺🇸' },
    { id: 55, bank: 'US Bank', balance: '$43,200', type: 'Savings', price: '$540', country: 'USA', flag: '🇺🇸' },
    { id: 56, bank: 'Capital One', balance: '$59,700', type: 'Checking', price: '$660', country: 'UK', flag: '🇬🇧' },
    { id: 57, bank: 'Truist Bank', balance: '$25,800', type: 'Business', price: '$420', country: 'USA', flag: '🇺🇸' },
    { id: 58, bank: 'Fifth Third Bank', balance: '$76,300', type: 'Savings', price: '$750', country: 'USA', flag: '🇺🇸' },
    { id: 59, bank: 'Regions Bank', balance: '$32,600', type: 'Checking', price: '$460', country: 'USA', flag: '🇺🇸' },
    { id: 60, bank: 'KeyBank', balance: '$46,100', type: 'Business', price: '$560', country: 'USA', flag: '🇺🇸' },
    { id: 61, bank: 'M&T Bank', balance: '$19,400', type: 'Savings', price: '$340', country: 'USA', flag: '🇺🇸' },
    { id: 62, bank: 'Huntington Bank', balance: '$65,700', type: 'Checking', price: '$700', country: 'USA', flag: '🇺🇸' },
    { id: 63, bank: 'Comerica Bank', balance: '$28,200', type: 'Business', price: '$440', country: 'USA', flag: '🇺🇸' },
    { id: 64, bank: 'Zions Bank', balance: '$51,900', type: 'Savings', price: '$600', country: 'USA', flag: '🇺🇸' },
    { id: 65, bank: 'First National Bank', balance: '$74,600', type: 'Checking', price: '$740', country: 'AUS', flag: '🇦🇺' },
    { id: 66, bank: 'Synovus Bank', balance: '$23,700', type: 'Business', price: '$400', country: 'USA', flag: '🇺🇸' },
    { id: 67, bank: 'Associated Bank', balance: '$42,400', type: 'Savings', price: '$540', country: 'USA', flag: '🇺🇸' },
    { id: 68, bank: 'Frost Bank', balance: '$57,100', type: 'Checking', price: '$640', country: 'USA', flag: '🇺🇸' },
    { id: 69, bank: 'Santander Bank', balance: '$31,800', type: 'Business', price: '$460', country: 'UK', flag: '🇬🇧' },
    { id: 70, bank: 'BMO Harris Bank', balance: '$69,500', type: 'Savings', price: '$720', country: 'CAD', flag: '🇨🇦' },
    { id: 71, bank: 'TCF Bank', balance: '$24,900', type: 'Checking', price: '$400', country: 'USA', flag: '🇺🇸' },
    { id: 72, bank: 'Webster Bank', balance: '$48,200', type: 'Business', price: '$580', country: 'USA', flag: '🇺🇸' },
    { id: 73, bank: 'Chase Bank', balance: '$66,800', type: 'Savings', price: '$700', country: 'AUS', flag: '🇦🇺' },
    { id: 74, bank: 'Bank of America', balance: '$35,400', type: 'Checking', price: '$480', country: 'UK', flag: '🇬🇧' },
    { id: 75, bank: 'Commonwealth Bank', balance: '$41,200', type: 'Checking', price: '$540', country: 'AUS', flag: '🇦🇺' },
    { id: 76, bank: 'ANZ Bank', balance: '$33,800', type: 'Savings', price: '$460', country: 'AUS', flag: '🇦🇺' },
    { id: 77, bank: 'Westpac', balance: '$52,600', type: 'Business', price: '$620', country: 'AUS', flag: '🇦🇺' },
    { id: 78, bank: 'National Australia Bank', balance: '$28,400', type: 'Checking', price: '$420', country: 'AUS', flag: '🇦🇺' },
    { id: 79, bank: 'Barclays', balance: '$45,900', type: 'Savings', price: '$580', country: 'UK', flag: '🇬🇧' },
    { id: 80, bank: 'HSBC', balance: '$38,200', type: 'Business', price: '$520', country: 'UK', flag: '🇬🇧' },
    { id: 81, bank: 'Lloyds Bank', balance: '$31,700', type: 'Checking', price: '$460', country: 'UK', flag: '🇬🇧' },
    { id: 82, bank: 'NatWest', balance: '$27,300', type: 'Savings', price: '$420', country: 'UK', flag: '🇬🇧' },
    { id: 83, bank: 'Royal Bank of Canada', balance: '$56,100', type: 'Business', price: '$660', country: 'CAD', flag: '🇨🇦' },
    { id: 84, bank: 'Scotiabank', balance: '$42,800', type: 'Checking', price: '$540', country: 'CAD', flag: '🇨🇦' },
    { id: 85, bank: 'CIBC', balance: '$35,600', type: 'Savings', price: '$480', country: 'CAD', flag: '🇨🇦' },
    { id: 86, bank: 'Bank of Montreal', balance: '$49,400', type: 'Business', price: '$580', country: 'CAD', flag: '🇨🇦' },
    { id: 87, bank: 'JPMorgan Chase', balance: '$63,200', type: 'Checking', price: '$680', country: 'USA', flag: '🇺🇸' },
    { id: 88, bank: 'Goldman Sachs', balance: '$78,900', type: 'Business', price: '$750', country: 'USA', flag: '🇺🇸' },
    { id: 89, bank: 'Morgan Stanley', balance: '$55,700', type: 'Savings', price: '$640', country: 'USA', flag: '🇺🇸' },
    { id: 90, bank: 'American Express', balance: '$41,600', type: 'Checking', price: '$520', country: 'USA', flag: '🇺🇸' },
    { id: 91, bank: 'Deutsche Bank', balance: '$47,300', type: 'Business', price: '$560', country: 'UK', flag: '🇬🇧' },
    { id: 92, bank: 'Credit Suisse', balance: '$39,800', type: 'Savings', price: '$500', country: 'UK', flag: '🇬🇧' },
    { id: 93, bank: 'UBS', balance: '$58,400', type: 'Checking', price: '$660', country: 'UK', flag: '🇬🇧' },
    { id: 94, bank: 'Standard Chartered', balance: '$44,100', type: 'Business', price: '$540', country: 'UK', flag: '🇬🇧' },
    { id: 95, bank: 'Macquarie Bank', balance: '$36,900', type: 'Savings', price: '$480', country: 'AUS', flag: '🇦🇺' },
    { id: 96, bank: 'Bendigo Bank', balance: '$29,200', type: 'Checking', price: '$420', country: 'AUS', flag: '🇦🇺' },
    { id: 97, bank: 'ING Bank', balance: '$53,600', type: 'Business', price: '$620', country: 'AUS', flag: '🇦🇺' },
    { id: 98, bank: 'Suncorp Bank', balance: '$32,800', type: 'Savings', price: '$460', country: 'AUS', flag: '🇦🇺' },
    { id: 99, bank: 'National Bank of Canada', balance: '$46,500', type: 'Checking', price: '$560', country: 'CAD', flag: '🇨🇦' },
    { id: 100, bank: 'Laurentian Bank', balance: '$25,700', type: 'Business', price: '$400', country: 'CAD', flag: '🇨🇦' },
    { id: 101, bank: 'Tangerine Bank', balance: '$38,300', type: 'Savings', price: '$500', country: 'CAD', flag: '🇨🇦' },
    { id: 102, bank: 'Desjardins', balance: '$51,200', type: 'Checking', price: '$600', country: 'CAD', flag: '🇨🇦' },
    { id: 103, bank: 'Metro Bank', balance: '$34,700', type: 'Business', price: '$480', country: 'UK', flag: '🇬🇧' },
    { id: 104, bank: 'Monzo', balance: '$18,900', type: 'Savings', price: '$320', country: 'UK', flag: '🇬🇧' },
    { id: 105, bank: 'Starling Bank', balance: '$22,400', type: 'Checking', price: '$380', country: 'UK', flag: '🇬🇧' },
    { id: 106, bank: 'Revolut', balance: '$15,600', type: 'Business', price: '$280', country: 'UK', flag: '🇬🇧' },
    { id: 107, bank: 'Ally Bank', balance: '$43,800', type: 'Savings', price: '$540', country: 'USA', flag: '🇺🇸' },
    { id: 108, bank: 'Discover Bank', balance: '$37,500', type: 'Checking', price: '$500', country: 'USA', flag: '🇺🇸' },
    { id: 109, bank: 'Charles Schwab', balance: '$61,900', type: 'Business', price: '$680', country: 'USA', flag: '🇺🇸' },
    { id: 110, bank: 'Fidelity Bank', balance: '$48,200', type: 'Savings', price: '$580', country: 'USA', flag: '🇺🇸' },
    { id: 111, bank: 'Up Bank', balance: '$26,300', type: 'Checking', price: '$400', country: 'AUS', flag: '🇦🇺' },
    { id: 112, bank: '86 400', balance: '$34,100', type: 'Business', price: '$470', country: 'AUS', flag: '🇦🇺' },
    { id: 113, bank: 'Xinja Bank', balance: '$19,800', type: 'Savings', price: '$340', country: 'AUS', flag: '🇦🇺' },
    { id: 114, bank: 'Judo Bank', balance: '$52,700', type: 'Checking', price: '$620', country: 'AUS', flag: '🇦🇺' },
    { id: 115, bank: 'Canadian Western Bank', balance: '$40,600', type: 'Business', price: '$520', country: 'CAD', flag: '🇨🇦' },
    { id: 116, bank: 'ATB Financial', balance: '$33,400', type: 'Savings', price: '$460', country: 'CAD', flag: '🇨🇦' },
    { id: 117, bank: 'First West Credit Union', balance: '$27,900', type: 'Checking', price: '$420', country: 'CAD', flag: '🇨🇦' },
    { id: 118, bank: 'Vancity', balance: '$45,200', type: 'Business', price: '$560', country: 'CAD', flag: '🇨🇦' },
    { id: 119, bank: 'TSB Bank', balance: '$31,100', type: 'Savings', price: '$450', country: 'UK', flag: '🇬🇧' },
    { id: 120, bank: 'Virgin Money', balance: '$39,700', type: 'Checking', price: '$500', country: 'UK', flag: '🇬🇧' },
    { id: 121, bank: 'Nationwide', balance: '$54,300', type: 'Business', price: '$640', country: 'UK', flag: '🇬🇧' },
    { id: 122, bank: 'Yorkshire Bank', balance: '$28,600', type: 'Savings', price: '$420', country: 'UK', flag: '🇬🇧' },
    { id: 123, bank: 'SunTrust Bank', balance: '$47,800', type: 'Checking', price: '$580', country: 'USA', flag: '🇺🇸' },
    { id: 124, bank: 'BB&T Bank', balance: '$35,900', type: 'Business', price: '$480', country: 'USA', flag: '🇺🇸' }
  ];

  const accountTypes = ['Checking', 'Savings', 'Business'];
  const countries = ['USA', 'UK', 'CAD', 'AUS'];

  // Helper function to convert balance string to number
  const parseBalance = (balanceStr: string) => {
    return parseInt(balanceStr.replace(/[$,]/g, ''));
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = bankProducts.filter(product => {
      // Search by bank name
      const matchesSearch = product.bank.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by balance range
      const balance = parseBalance(product.balance);
      const min = minBalance ? parseInt(minBalance) : 0;
      const max = maxBalance ? parseInt(maxBalance) : Infinity;
      const matchesBalance = balance >= min && balance <= max;
      
      // Filter by account type
      const matchesType = selectedAccountTypes.length === 0 || selectedAccountTypes.includes(product.type);
      
      // Filter by country
      const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(product.country);
      
      return matchesSearch && matchesBalance && matchesType && matchesCountry;
    });

    // Sort products
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.bank.localeCompare(b.bank));
    } else if (sortBy === 'balance-low') {
      filtered.sort((a, b) => parseBalance(a.balance) - parseBalance(b.balance));
    } else if (sortBy === 'balance-high') {
      filtered.sort((a, b) => parseBalance(b.balance) - parseBalance(a.balance));
    }

    return filtered;
  }, [searchTerm, minBalance, maxBalance, selectedAccountTypes, selectedCountries, sortBy]);

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.bank} ${product.type} account (${product.country}) has been added to your cart.`,
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

  const handleCountryChange = (country: string, checked: boolean) => {
    if (checked) {
      setSelectedCountries([...selectedCountries, country]);
    } else {
      setSelectedCountries(selectedCountries.filter(c => c !== country));
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinBalance('');
    setMaxBalance('');
    setSelectedAccountTypes([]);
    setSelectedCountries([]);
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
            Bank Logs
          </h1>
          <p className="text-cyber-light/60">
            Premium bank account credentials with verified balances ({filteredProducts.length} available)
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-light/50 h-4 w-4" />
            <Input 
              placeholder="Search by bank name..."
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

                {/* Countries */}
                <div className="space-y-2">
                  <label className="text-sm text-cyber-light/70">Countries</label>
                  <div className="space-y-2">
                    {countries.map((country) => (
                      <div key={country} className="flex items-center space-x-2">
                        <Checkbox
                          id={country}
                          checked={selectedCountries.includes(country)}
                          onCheckedChange={(checked) => handleCountryChange(country, checked as boolean)}
                          className="border-cyber-blue/30"
                        />
                        <label htmlFor={country} className="text-sm text-cyber-light">
                          {country}
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
              No banks found matching your criteria
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
                      <p className="text-cyber-light/60 text-sm flex items-center gap-1">
                        {product.type} • {product.flag} {product.country}
                      </p>
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
