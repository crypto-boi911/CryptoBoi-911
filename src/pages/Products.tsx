
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    setAddingToCart(productId);
    try {
      const { data: existingItem } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        const { error } = await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cart')
          .insert({
            user_id: user.id,
            product_id: productId,
            quantity: 1
          });

        if (error) throw error;
      }

      toast({
        title: "Added to Cart",
        description: "Item successfully added to your cart",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setAddingToCart(null);
    }
  };

  const categories = [...new Set(products.map(p => p.category))];

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-cyber-gradient pt-20 flex items-center justify-center">
          <div className="text-cyber-blue text-xl">Loading products...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-cyber-gradient pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
                Our Products
              </h1>
              <p className="text-xl text-cyber-light/70">
                Premium cybersecurity solutions and digital assets
              </p>
            </div>

            {categories.map((category, categoryIndex) => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-cyber font-bold text-cyber-blue mb-6">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    .filter(product => product.category === category)
                    .map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (categoryIndex * 0.1) + (index * 0.1), duration: 0.5 }}
                      >
                        <Card className="bg-cyber-darker/60 border-cyber-blue/30 hover:border-cyber-blue/60 transition-all duration-300 h-full">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-4">
                              <Package className="h-8 w-8 text-cyber-blue" />
                              <span className="text-cyber-light/60 text-sm">
                                Stock: {product.stock}
                              </span>
                            </div>
                            <CardTitle className="text-cyber-light font-tech">
                              {product.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-cyber-light/80 text-sm">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-green-400">
                                ${product.price}
                              </span>
                              <div className="flex gap-2">
                                <Link to={`/products/${product.id}`}>
                                  <Button
                                    variant="outline"
                                    className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                                  >
                                    View Details
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() => addToCart(product.id)}
                                  disabled={addingToCart === product.id || product.stock === 0}
                                  className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark"
                                >
                                  {addingToCart === product.id ? (
                                    'Adding...'
                                  ) : product.stock === 0 ? (
                                    'Out of Stock'
                                  ) : (
                                    <>
                                      <ShoppingCart className="h-4 w-4 mr-2" />
                                      Add to Cart
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
