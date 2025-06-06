
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } = '@/hooks/use-toast';

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  };
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);
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
            description,
            price,
            category
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

    setUpdatingItem(itemId);
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
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdatingItem(null);
    }
  };

  const removeItem = async (itemId: string) => {
    setUpdatingItem(itemId);
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setCartItems(items => items.filter(item => item.id !== itemId));
      
      toast({
        title: "Item Removed",
        description: "Item removed from cart",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdatingItem(null);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const proceedToCheckout = () => {
    navigate('/dashboard/checkout');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient pt-20 flex items-center justify-center">
        <div className="text-cyber-blue text-xl">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-gradient pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
              Shopping Cart
            </h1>
            <p className="text-xl text-cyber-light/70">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {cartItems.length === 0 ? (
            <Card className="bg-cyber-darker/60 border-cyber-blue/30 text-center py-12">
              <CardContent>
                <ShoppingCart className="h-16 w-16 text-cyber-blue/50 mx-auto mb-4" />
                <h2 className="text-2xl font-cyber text-cyber-light mb-4">Your cart is empty</h2>
                <p className="text-cyber-light/70 mb-6">
                  Start shopping to add items to your cart
                </p>
                <Button
                  onClick={() => navigate('/products')}
                  className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark"
                >
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="bg-cyber-darker/60 border-cyber-blue/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-cyber text-cyber-light mb-2">
                            {item.product.name}
                          </h3>
                          <p className="text-cyber-light/70 text-sm mb-2">
                            {item.product.description}
                          </p>
                          <span className="text-cyber-blue text-sm">
                            {item.product.category}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={updatingItem === item.id || item.quantity <= 1}
                              variant="outline"
                              size="sm"
                              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-cyber-light font-bold px-3">
                              {item.quantity}
                            </span>
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={updatingItem === item.id}
                              variant="outline"
                              size="sm"
                              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-400">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-cyber-light/60 text-sm">
                              ${item.product.price} each
                            </p>
                          </div>
                          
                          <Button
                            onClick={() => removeItem(item.id)}
                            disabled={updatingItem === item.id}
                            variant="outline"
                            size="sm"
                            className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <Card className="bg-cyber-darker/60 border-cyber-blue/30 sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-cyber-light font-tech">
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-cyber-light/70">
                            {item.product.name} x{item.quantity}
                          </span>
                          <span className="text-cyber-light">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-cyber-blue/20 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-cyber-light">Total:</span>
                        <span className="text-green-400">${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={proceedToCheckout}
                      className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech"
                      size="lg"
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
