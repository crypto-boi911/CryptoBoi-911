
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Edit, Trash2, Search, Filter, TrendingUp, DollarSign } from 'lucide-react';
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
  
  // Enhanced product list with all categories represented
  const [products, setProducts] = useState<Product[]>([
    // Sample products from all categories to show admin has access to everything
    // Bank Logs Products
    { id: 1, name: 'Chase Bank', category: 'Bank Logs', type: 'Checking', balance: '$25,000', price: 250, status: 'active', stock: 15, country: 'USA', flag: '🇺🇸' },
    { id: 2, name: 'Bank of America', category: 'Bank Logs', type: 'Savings', balance: '$18,500', price: 320, status: 'active', stock: 8, country: 'USA', flag: '🇺🇸' },
    { id: 3, name: 'Wells Fargo', category: 'Bank Logs', type: 'Business', balance: '$32,000', price: 480, status: 'active', stock: 12, country: 'USA', flag: '🇺🇸' },
    
    // PayPal Logs (showing some of the new ones)
    { id: 31, name: 'PayPal Business Premium', category: 'PayPal Logs', type: 'Business', balance: '$2,450', price: 180, status: 'active', stock: 8 },
    { id: 32, name: 'PayPal Personal Verified', category: 'PayPal Logs', type: 'Personal', balance: '$1,200', price: 120, status: 'active', stock: 15 },
    { id: 33, name: 'PayPal Merchant Account', category: 'PayPal Logs', type: 'Business', balance: '$3,800', price: 220, status: 'active', stock: 5 },
    
    // Cards (showing some of the new ones)
    { id: 101, name: 'Visa Platinum Credit', category: 'Cards', type: 'Credit Card', balance: '$1,200', price: 65, status: 'active', stock: 12 },
    { id: 102, name: 'Mastercard Gold', category: 'Cards', type: 'Debit Card', balance: '$800', price: 55, status: 'active', stock: 18 },
    { id: 103, name: 'American Express Black', category: 'Cards', type: 'Credit Card', balance: '$1,500', price: 75, status: 'active', stock: 3 },
    
    // CashApp Logs (showing some of the new ones)
    { id: 201, name: 'CashApp Business Verified', category: 'CashApp Logs', type: 'Business', balance: '$2,100', price: 160, status: 'active', stock: 7 },
    { id: 202, name: 'CashApp Personal Premium', category: 'CashApp Logs', type: 'Personal', balance: '$900', price: 110, status: 'active', stock: 12 },
    { id: 203, name: 'CashApp Student', category: 'CashApp Logs', type: 'Personal', balance: '$650', price: 99, status: 'active', stock: 22 },
    
    // Tools
    { id: 301, name: 'Premium VPN Access', category: 'Tools', type: 'Security', balance: 'N/A', price: 150, status: 'active', stock: 25 },
    { id: 302, name: 'Card Checker Pro', category: 'Tools', type: 'Utility', balance: 'N/A', price: 120, status: 'active', stock: 40 },
    { id: 303, name: 'Bank Validator Tool', category: 'Tools', type: 'Utility', balance: 'N/A', price: 200, status: 'active', stock: 15 },
  ]);

  const [productStats, setProductStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
    activeProducts: 0
  });

  useEffect(() => {
    // Log admin access
    const adminLogs = JSON.parse(localStorage.getItem('adminActivityLogs') || '[]');
    adminLogs.push({
      id: crypto.randomUUID(),
      action: 'PRODUCTS_VIEW',
      timestamp: new Date().toISOString(),
      details: 'Admin accessed product management page',
      sessionId: JSON.parse(localStorage.getItem('adminSession') || '{}').sessionId
    });
    localStorage.setItem('adminActivityLogs', JSON.stringify(adminLogs));

    // Calculate product statistics
    const stats = {
      totalProducts: products.length,
      totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
      lowStock: products.filter(p => p.stock < 10).length,
      activeProducts: products.filter(p => p.status === 'active').length
    };
    setProductStats(stats);
  }, [products]);

  const deleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      
      // Log admin action
      const adminLogs = JSON.parse(localStorage.getItem('adminActivityLogs') || '[]');
      adminLogs.push({
        id: crypto.randomUUID(),
        action: 'PRODUCT_DELETE',
        timestamp: new Date().toISOString(),
        details: `Deleted product with ID ${id}`,
        sessionId: JSON.parse(localStorage.getItem('adminSession') || '{}').sessionId
      });
      localStorage.setItem('adminActivityLogs', JSON.stringify(adminLogs));
      
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
    
    // Log admin action
    const adminLogs = JSON.parse(localStorage.getItem('adminActivityLogs') || '[]');
    adminLogs.push({
      id: crypto.randomUUID(),
      action: 'PRODUCT_UPDATE',
      timestamp: new Date().toISOString(),
      details: `Updated product: ${updatedProduct.name}`,
      sessionId: JSON.parse(localStorage.getItem('adminSession') || '{}').sessionId
    });
    localStorage.setItem('adminActivityLogs', JSON.stringify(adminLogs));
    
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
    
    // Log admin action
    const adminLogs = JSON.parse(localStorage.getItem('adminActivityLogs') || '[]');
    adminLogs.push({
      id: crypto.randomUUID(),
      action: 'PRODUCT_ADD',
      timestamp: new Date().toISOString(),
      details: `Added new product: ${newProduct.name}`,
      sessionId: JSON.parse(localStorage.getItem('adminSession') || '{}').sessionId
    });
    localStorage.setItem('adminActivityLogs', JSON.stringify(adminLogs));
    
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
                Manage all products across all dashboard categories • Real-time sync
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

          {/* Enhanced Product Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Total Products</p>
                    <p className="text-2xl font-bold text-cyber-blue">{productStats.totalProducts}</p>
                    <p className="text-xs text-cyber-light/60 mt-1">All categories</p>
                  </div>
                  <Package className="h-8 w-8 text-cyber-blue" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Active Products</p>
                    <p className="text-2xl font-bold text-green-400">{productStats.activeProducts}</p>
                    <p className="text-xs text-green-400 mt-1">↗ Available</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Inventory Value</p>
                    <p className="text-2xl font-bold text-green-400">${productStats.totalValue.toLocaleString()}</p>
                    <p className="text-xs text-green-400 mt-1">↗ Total worth</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-400">{productStats.lowStock}</p>
                    <p className="text-xs text-yellow-400 mt-1">⚠ Needs restock</p>
                  </div>
                  <Package className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
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
              <div className="mt-4 text-sm text-cyber-light/60">
                Showing {filteredProducts.length} of {products.length} products • Synced with all dashboard pages
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
                    All Products ({filteredProducts.length}) • Live Data
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
                        <TableCell>
                          <Badge variant="outline" className="text-cyber-blue border-cyber-blue/30">
                            {product.category}
                          </Badge>
                        </TableCell>
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
                        <TableCell className={`${product.stock < 10 ? 'text-yellow-400' : 'text-cyber-light'}`}>
                          {product.stock}
                          {product.stock < 10 && ' ⚠'}
                        </TableCell>
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
