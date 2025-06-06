
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react';
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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
        return;
      }

      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/products');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!product) return;

    setAddingToCart(true);
    try {
      const { data: existingItem } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
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
            product_id: product.id,
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
      setAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-cyber-gradient pt-20 flex items-center justify-center">
          <div className="text-cyber-blue text-xl">Loading product...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-cyber-gradient pt-20 flex items-center justify-center">
          <div className="text-red-400 text-xl">Product not found</div>
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
            <Button
              onClick={() => navigate('/products')}
              variant="outline"
              className="mb-6 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="space-y-4">
                <Card className="bg-cyber-darker/60 border-cyber-blue/30">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-cyber-gray/20 rounded-lg flex items-center justify-center">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="h-24 w-24 text-cyber-blue/50" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-cyber font-bold text-cyber-blue mb-2">
                    {product.name}
                  </h1>
                  <p className="text-cyber-light/60 text-lg">{product.category}</p>
                </div>

                <div className="text-3xl font-bold text-green-400">
                  ${product.price.toFixed(2)}
                </div>

                <Card className="bg-cyber-darker/60 border-cyber-blue/30">
                  <CardHeader>
                    <CardTitle className="text-cyber-light font-tech">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cyber-light/80">
                      {product.description || 'No description available.'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-cyber-darker/60 border-cyber-blue/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-cyber-light/70">Stock:</span>
                      <span className={`font-bold ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  onClick={addToCart}
                  disabled={addingToCart || product.stock === 0}
                  className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech text-lg py-6"
                  size="lg"
                >
                  {addingToCart ? (
                    'Adding to Cart...'
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </>
                  )}
                </Button>

                {!user && (
                  <p className="text-cyber-light/60 text-sm text-center">
                    Please <button onClick={() => navigate('/login')} className="text-cyber-blue hover:underline">login</button> to add items to cart
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
