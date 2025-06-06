import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import SimpleFooter from '@/components/SimpleFooter';

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
  };
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const { data, error } = await supabase
        .from('cart')
        .select(`
          id,
          quantity,
          product:products (
            id,
            name,
            price,
            category,
            stock
          )
        `)
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error fetching cart items:', error);
        return;
      }

      setCartItems(data || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdatingItems(prev => new Set(prev).add(itemId));
    try {
      const { error } = await supabase
        .from('cart')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) throw error;

      setCartItems(items =>
        items.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );

      toast({
        title: "Cart Updated",
        description: "Item quantity updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const removeItem = async (itemId: string) => {
    setUpdatingItems(prev => new Set(prev).add(itemId));
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setCartItems(items => items.filter(item => item.id !== itemId));

      toast({
        title: "Item Removed",
        description: "Item removed from cart successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-cyber-gradient pt-20 flex items-center justify-center">
          <div className="text-cyber-blue text-xl">Loading cart...</div>
        </div>
        <SimpleFooter />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-cyber-gradient pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
                Your Cart
              </h1>
              <p className="text-xl text-cyber-light/70">
                Review your items before checkout
              </p>
            </div>

            {cartItems.length === 0 ? (
              <Card className="bg-cyber-darker/60 border-cyber-blue/30 text-center py-12">
                <CardContent>
                  <ShoppingCart className="h-16 w-16 text-cyber-blue/50 mx-auto mb-4" />
                  <h2 className="text-2xl font-cyber text-cyber-light mb-4">Your cart is empty</h2>
                  <p className="text-cyber-light/70 mb-6">
                    Browse our products and add some items to your cart
                  </p>
                  <Button
                    onClick={() => navigate('/products')}
                    className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech"
                  >
                    Browse Products
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="bg-cyber-darker/60 border-cyber-blue/30">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-cyber text-cyber-light mb-2">
                              {item.product.name}
                            </h3>
                            <p className="text-cyber-light/60 text-sm mb-2">
                              {item.product.category}
                            </p>
                            <p className="text-green-400 font-bold text-lg">
                              ${item.product.price.toFixed(2)} each
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={updatingItems.has(item.id) || item.quantity <= 1}
                                variant="outline"
                                size="sm"
                                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="text-cyber-light font-bold px-4">
                                {item.quantity}
                              </span>
                              <Button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={updatingItems.has(item.id) || item.quantity >= item.product.stock}
                                variant="outline"
                                size="sm"
                                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <p className="text-green-400 font-bold text-lg">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>

                            <Button
                              onClick={() => removeItem(item.id)}
                              disabled={updatingItems.has(item.id)}
                              variant="outline"
                              size="sm"
                              className="border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Cart Summary */}
                <Card className="bg-cyber-darker/60 border-cyber-blue/30">
                  <CardHeader>
                    <CardTitle className="text-cyber-light font-tech">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-cyber-light">Total:</span>
                      <span className="text-green-400">${calculateTotal().toFixed(2)}</span>
                    </div>
                    
                    <Button
                      onClick={() => navigate('/dashboard/checkout')}
                      className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech text-lg py-6"
                      size="lg"
                    >
                      Proceed to Checkout
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <SimpleFooter />
    </>
  );
};

export default Cart;
