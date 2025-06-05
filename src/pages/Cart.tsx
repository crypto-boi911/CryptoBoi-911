
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useTierSystem } from '@/hooks/useTierSystem';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CartItem {
  id: string;
  product_name: string;
  product_type: string;
  balance: string;
  price: number;
  quantity: number;
}

interface DiscountedItem extends CartItem {
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const { applyDiscount, currentTier } = useTierSystem();
  const { user, isLoading, logActivity } = useAuth();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
      return;
    }
  }, [user, isLoading, navigate]);

  // Load cart data from Supabase
  useEffect(() => {
    const loadCartData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCartItems(data || []);
        
        // Log cart view activity
        await logActivity('CART_VIEW', { itemCount: data?.length || 0 });
      } catch (error) {
        console.error('Error loading cart:', error);
        toast({
          title: "Error",
          description: "Failed to load cart data",
          variant: "destructive"
        });
        
        // Fallback to demo data
        const demoItems = [
          { id: 'demo-1', product_name: 'Chase Bank Log', product_type: 'Bank Account', balance: '$25,000', price: 500, quantity: 1 },
          { id: 'demo-2', product_name: 'PayPal Business', product_type: 'PayPal Account', balance: '$45,000', price: 750, quantity: 2 },
          { id: 'demo-3', product_name: 'Visa Platinum', product_type: 'Credit Card', balance: '$50,000', price: 800, quantity: 1 },
        ];
        setCartItems(demoItems);
      } finally {
        setIsCartLoading(false);
      }
    };

    if (user && !isLoading) {
      loadCartData();
    }
  }, [user, isLoading, toast, logActivity]);

  // Set up real-time subscription for cart changes
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('cart-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cart_items',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Cart change detected:', payload);
          // Reload cart data when changes occur
          loadCartData();
        }
      )
      .subscribe();

    const loadCartData = async () => {
      try {
        const { data, error } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCartItems(data || []);
      } catch (error) {
        console.error('Error reloading cart:', error);
      }
    };

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Calculate discounts for each item
  const discountedItems: DiscountedItem[] = cartItems.map(item => {
    const categoryMap: { [key: string]: string } = {
      'Bank Account': 'banklogs',
      'PayPal Account': 'paypallogs', 
      'CashApp Account': 'cashapplogs',
      'Credit Card': 'cards'
    };
    
    const category = categoryMap[item.product_type] || '';
    const discountInfo = applyDiscount(item.price, category);
    
    return {
      ...item,
      originalPrice: discountInfo.originalPrice,
      discountedPrice: discountInfo.discountedPrice,
      discount: discountInfo.discount
    };
  });

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      if (newQuantity === 0) {
        await removeItem(id);
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      // Update local state immediately for better UX
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );

      await logActivity('CART_UPDATE_QUANTITY', { itemId: id, newQuantity });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async (id: string) => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      // Update local state immediately
      setCartItems(items => items.filter(item => item.id !== id));
      
      await logActivity('CART_REMOVE_ITEM', { itemId: id });
      
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountedSubtotal = discountedItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
  const totalSavings = subtotal - discountedSubtotal;
  const tax = discountedSubtotal * 0.1;
  const total = discountedSubtotal + tax;

  const handleProceedToCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add items to your cart before proceeding to checkout",
        variant: "destructive"
      });
      return;
    }

    if (isUpdating) {
      toast({
        title: "Please wait",
        description: "Cart is being updated, please try again in a moment",
        variant: "destructive"
      });
      return;
    }

    try {
      await logActivity('CHECKOUT_INITIATED', { 
        itemCount: cartItems.length, 
        total: total,
        discountApplied: totalSavings 
      });
      
      console.log('Proceeding to checkout with total:', total);
      navigate('/dashboard/checkout');
    } catch (error) {
      console.error('Error initiating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to proceed to checkout",
        variant: "destructive"
      });
    }
  };

  // Show loading state
  if (isLoading || isCartLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
        <div className="text-cyber-light flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyber-blue"></div>
          Loading cart...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-gradient p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border-cyber-blue/30 text-cyber-light hover:bg-cyber-blue/10"
              disabled={isUpdating}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="text-3xl font-cyber font-bold text-cyber-light mb-4 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8" />
            Shopping Cart
          </h1>
          <p className="text-cyber-light/60">
            Review your selected items and proceed to checkout
          </p>
          
          {/* Tier Benefits Display */}
          {totalSavings > 0 && (
            <Card className="mt-4 bg-green-500/20 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-green-400">
                  <Percent className="h-5 w-5" />
                  <div>
                    <div className="font-tech">
                      {currentTier.name} Tier Benefits Active!
                    </div>
                    <div className="text-sm">
                      You're saving ${totalSavings.toFixed(2)} with your current tier
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
                <CardContent className="p-8 text-center">
                  <ShoppingCart className="h-16 w-16 text-cyber-light/30 mx-auto mb-4" />
                  <p className="text-cyber-light/60">Your cart is empty</p>
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="mt-4 bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80"
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              discountedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-cyber-light font-tech font-semibold">{item.product_name}</h3>
                          <p className="text-cyber-light/60 text-sm">{item.product_type}</p>
                          <p className="text-cyber-blue text-sm">Balance: {item.balance}</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                              disabled={isUpdating}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-cyber-light font-tech w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                              disabled={isUpdating}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            {item.discount > 0 && (
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-green-400 border-green-400/30 text-xs">
                                  {item.discount}% off
                                </Badge>
                              </div>
                            )}
                            {item.discount > 0 && (
                              <p className="text-cyber-light/40 line-through text-xs">
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </p>
                            )}
                            <p className="text-green-400 font-bold">
                              ${(item.discountedPrice * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-cyber-light/60 text-xs">
                              ${item.discountedPrice.toFixed(2)} each
                            </p>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 border-red-400/30 hover:bg-red-400 hover:text-white"
                            disabled={isUpdating}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 sticky top-6">
              <CardHeader>
                <CardTitle className="text-cyber-light font-tech">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-cyber-light/60">Original Subtotal</span>
                  <span className="text-cyber-light/60 line-through">${subtotal.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-400">Tier Discount</span>
                    <span className="text-green-400">-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-cyber-light/60">Subtotal</span>
                  <span className="text-cyber-light">${discountedSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-light/60">Processing Fee</span>
                  <span className="text-cyber-light">${tax.toFixed(2)}</span>
                </div>
                <Separator className="bg-cyber-blue/20" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-cyber-light">Total</span>
                  <span className="text-green-400">${total.toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80 font-tech"
                  disabled={cartItems.length === 0 || isUpdating}
                  onClick={handleProceedToCheckout}
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyber-dark mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
