import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ProductEditModal from '@/components/ProductEditModal';
import AddProductModal from '@/components/AddProductModal';

interface Product {
  id: number;
  name: string;
  category: string;
  type: string;
  balance: string;
  price: number;
  status: 'active' | 'inactive';
  stock: number;
  country?: string;
  flag?: string;
}

const AdminProducts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([
    // Bank Logs Products
    { id: 1, name: 'Chase Bank', category: 'Bank Logs', type: 'Checking', balance: '$25,000', price: 250, status: 'active', stock: 15, country: 'USA', flag: '🇺🇸' },
    { id: 2, name: 'Bank of America', category: 'Bank Logs', type: 'Savings', balance: '$18,500', price: 320, status: 'active', stock: 8, country: 'USA', flag: '🇺🇸' },
    { id: 3, name: 'Wells Fargo', category: 'Bank Logs', type: 'Business', balance: '$32,000', price: 480, status: 'active', stock: 12, country: 'USA', flag: '🇺🇸' },
    { id: 4, name: 'Citibank', category: 'Bank Logs', type: 'Checking', balance: '$15,750', price: 280, status: 'active', stock: 6, country: 'USA', flag: '🇺🇸' },
    { id: 5, name: 'TD Bank', category: 'Bank Logs', type: 'Business', balance: '$42,000', price: 620, status: 'active', stock: 9, country: 'CAD', flag: '🇨🇦' },
    { id: 6, name: 'PNC Bank', category: 'Bank Logs', type: 'Savings', balance: '$28,300', price: 420, status: 'active', stock: 18, country: 'USA', flag: '🇺🇸' },
    { id: 7, name: 'US Bank', category: 'Bank Logs', type: 'Checking', balance: '$19,800', price: 340, status: 'active', stock: 5, country: 'USA', flag: '🇺🇸' },
    { id: 8, name: 'Capital One', category: 'Bank Logs', type: 'Business', balance: '$36,500', price: 540, status: 'active', stock: 11, country: 'USA', flag: '🇺🇸' },
    { id: 9, name: 'Truist Bank', category: 'Bank Logs', type: 'Savings', balance: '$21,200', price: 380, status: 'active', stock: 7, country: 'USA', flag: '🇺🇸' },
    { id: 10, name: 'Fifth Third Bank', category: 'Bank Logs', type: 'Checking', balance: '$33,700', price: 460, status: 'active', stock: 20, country: 'USA', flag: '🇺🇸' },
    { id: 11, name: 'Regions Bank', category: 'Bank Logs', type: 'Business', balance: '$27,900', price: 420, status: 'active', stock: 13, country: 'USA', flag: '🇺🇸' },
    { id: 12, name: 'KeyBank', category: 'Bank Logs', type: 'Savings', balance: '$16,400', price: 300, status: 'active', stock: 8, country: 'USA', flag: '🇺🇸' },
    { id: 13, name: 'M&T Bank', category: 'Bank Logs', type: 'Checking', balance: '$38,600', price: 520, status: 'active', stock: 14, country: 'USA', flag: '🇺🇸' },
    { id: 14, name: 'Huntington Bank', category: 'Bank Logs', type: 'Business', balance: '$22,800', price: 390, status: 'active', stock: 9, country: 'USA', flag: '🇺🇸' },
    { id: 15, name: 'Comerica Bank', category: 'Bank Logs', type: 'Savings', balance: '$31,500', price: 450, status: 'active', stock: 16, country: 'USA', flag: '🇺🇸' },
    { id: 16, name: 'Zions Bank', category: 'Bank Logs', type: 'Checking', balance: '$24,300', price: 400, status: 'active', stock: 12, country: 'USA', flag: '🇺🇸' },
    { id: 17, name: 'Santander Bank', category: 'Bank Logs', type: 'Savings', balance: '$20,400', price: 360, status: 'active', stock: 10, country: 'UK', flag: '🇬🇧' },
    { id: 18, name: 'BMO Harris Bank', category: 'Bank Logs', type: 'Checking', balance: '$34,100', price: 470, status: 'active', stock: 7, country: 'CAD', flag: '🇨🇦' },
    { id: 19, name: 'Barclays', category: 'Bank Logs', type: 'Business', balance: '$45,900', price: 580, status: 'active', stock: 11, country: 'UK', flag: '🇬🇧' },
    { id: 20, name: 'HSBC', category: 'Bank Logs', type: 'Savings', balance: '$38,200', price: 520, status: 'active', stock: 9, country: 'UK', flag: '🇬🇧' },
    { id: 21, name: 'Lloyds Bank', category: 'Bank Logs', type: 'Checking', balance: '$31,700', price: 460, status: 'active', stock: 13, country: 'UK', flag: '🇬🇧' },
    { id: 22, name: 'NatWest', category: 'Bank Logs', type: 'Savings', balance: '$27,300', price: 420, status: 'active', stock: 15, country: 'UK', flag: '🇬🇧' },
    { id: 23, name: 'Royal Bank of Canada', category: 'Bank Logs', type: 'Business', balance: '$56,100', price: 660, status: 'active', stock: 6, country: 'CAD', flag: '🇨🇦' },
    { id: 24, name: 'Scotiabank', category: 'Bank Logs', type: 'Checking', balance: '$42,800', price: 540, status: 'active', stock: 8, country: 'CAD', flag: '🇨🇦' },
    { id: 25, name: 'CIBC', category: 'Bank Logs', type: 'Savings', balance: '$35,600', price: 480, status: 'active', stock: 12, country: 'CAD', flag: '🇨🇦' },
    { id: 26, name: 'Bank of Montreal', category: 'Bank Logs', type: 'Business', balance: '$49,400', price: 580, status: 'active', stock: 10, country: 'CAD', flag: '🇨🇦' },
    { id: 27, name: 'Commonwealth Bank', category: 'Bank Logs', type: 'Checking', balance: '$41,200', price: 540, status: 'active', stock: 14, country: 'AUS', flag: '🇦🇺' },
    { id: 28, name: 'ANZ Bank', category: 'Bank Logs', type: 'Savings', balance: '$33,800', price: 460, status: 'active', stock: 11, country: 'AUS', flag: '🇦🇺' },
    { id: 29, name: 'Westpac', category: 'Bank Logs', type: 'Business', balance: '$52,600', price: 620, status: 'active', stock: 7, country: 'AUS', flag: '🇦🇺' },
    { id: 30, name: 'National Australia Bank', category: 'Bank Logs', type: 'Checking', balance: '$28,400', price: 420, status: 'active', stock: 16, country: 'AUS', flag: '🇦🇺' },
    
    // PayPal Logs
    { id: 31, name: 'PayPal Business Premium', category: 'PayPal Logs', type: 'Business', balance: '$45,000', price: 750, status: 'active', stock: 8 },
    { id: 32, name: 'PayPal Personal Verified', category: 'PayPal Logs', type: 'Personal', balance: '$22,500', price: 500, status: 'active', stock: 15 },
    { id: 33, name: 'PayPal Merchant Account', category: 'PayPal Logs', type: 'Business', balance: '$68,000', price: 850, status: 'active', stock: 5 },
    { id: 34, name: 'PayPal Student Account', category: 'PayPal Logs', type: 'Personal', balance: '$8,500', price: 280, status: 'active', stock: 20 },
    
    // Cards
    { id: 35, name: 'Visa Platinum Credit', category: 'Cards', type: 'Credit Card', balance: '$50,000', price: 800, status: 'active', stock: 12 },
    { id: 36, name: 'Mastercard Gold', category: 'Cards', type: 'Debit Card', balance: '$25,000', price: 450, status: 'active', stock: 18 },
    { id: 37, name: 'American Express Black', category: 'Cards', type: 'Credit Card', balance: '$75,000', price: 1200, status: 'active', stock: 3 },
    { id: 38, name: 'Visa Virtual Card', category: 'Cards', type: 'Virtual Card', balance: '$15,000', price: 350, status: 'active', stock: 25 },
    { id: 39, name: 'Mastercard Prepaid', category: 'Cards', type: 'Prepaid Card', balance: '$5,000', price: 180, status: 'active', stock: 30 },
    
    // CashApp Logs
    { id: 40, name: 'CashApp Business Verified', category: 'CashApp Logs', type: 'Business', balance: '$35,000', price: 650, status: 'active', stock: 7 },
    { id: 41, name: 'CashApp Personal Premium', category: 'CashApp Logs', type: 'Personal', balance: '$15,000', price: 400, status: 'inactive', stock: 0 },
    { id: 42, name: 'CashApp Student', category: 'CashApp Logs', type: 'Personal', balance: '$3,500', price: 200, status: 'active', stock: 22 },
    
    // Tools
    { id: 43, name: 'Premium VPN Access', category: 'Tools', type: 'Security', balance: 'N/A', price: 150, status: 'active', stock: 25 },
    { id: 44, name: 'Card Checker Pro', category: 'Tools', type: 'Utility', balance: 'N/A', price: 120, status: 'active', stock: 40 },
    { id: 45, name: 'Bank Validator Tool', category: 'Tools', type: 'Utility', balance: 'N/A', price: 200, status: 'active', stock: 15 },
    { id: 46, name: 'Proxy Generator', category: 'Tools', type: 'Security', balance: 'N/A', price: 180, status: 'active', stock: 35 },
  ]);

  const deleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      toast({
        title: "Product Deleted",
        description: "Product has been removed from the database",
      });
    }
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const saveProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    toast({
      title: "Product Updated",
      description: "Product details have been saved successfully",
    });
  };

  const addProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...newProductData,
      id: Math.max(...products.map(p => p.id)) + 1,
    };
    setProducts([...products, newProduct]);
    toast({
      title: "Product Added",
      description: "New product has been created successfully",
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-cyber-gradient pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link to="/admin/dashboard" className="text-cyber-blue hover:text-cyber-blue/80 mb-4 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
                Product Management
              </h1>
              <p className="text-xl text-cyber-light/70">
                Manage all dashboard products and inventory ({filteredProducts.length} products)
              </p>
            </div>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Filters */}
          <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-light/50 h-4 w-4" />
                  <Input 
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
                  />
                </div>
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 bg-cyber-gray/30 border border-cyber-blue/20 text-cyber-light rounded-md"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-cyber-gray text-cyber-light">
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Package className="h-8 w-8 text-cyber-blue" />
                <div>
                  <CardTitle className="text-cyber-light font-tech">
                    Products ({filteredProducts.length})
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-cyber-blue/20">
                      <TableHead className="text-cyber-light">Product</TableHead>
                      <TableHead className="text-cyber-light">Category</TableHead>
                      <TableHead className="text-cyber-light">Country</TableHead>
                      <TableHead className="text-cyber-light">Balance</TableHead>
                      <TableHead className="text-cyber-light">Price</TableHead>
                      <TableHead className="text-cyber-light">Stock</TableHead>
                      <TableHead className="text-cyber-light">Status</TableHead>
                      <TableHead className="text-cyber-light">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id} className="border-cyber-blue/10">
                        <TableCell>
                          <div>
                            <div className="text-cyber-light font-medium">{product.name}</div>
                            <div className="text-cyber-light/60 text-sm">{product.type}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-cyber-blue">{product.category}</TableCell>
                        <TableCell className="text-cyber-light">
                          {product.country ? (
                            <span className="flex items-center gap-1">
                              {product.flag} {product.country}
                            </span>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell className="text-cyber-light font-mono">{product.balance}</TableCell>
                        <TableCell className="text-green-400 font-bold">${product.price}</TableCell>
                        <TableCell className="text-cyber-light">{product.stock}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={product.status === 'active' ? 'default' : 'secondary'}
                            className={product.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => editProduct(product)}
                              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteProduct(product.id)}
                              className="border-red-400/30 text-red-400 hover:bg-red-400 hover:text-white"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Edit Product Modal */}
      <ProductEditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={saveProduct}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addProduct}
      />
    </div>
  );
};

export default AdminProducts;
