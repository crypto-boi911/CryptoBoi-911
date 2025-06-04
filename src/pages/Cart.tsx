
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Chase Bank Log', type: 'Bank Account', balance: '$25,000', price: 500, quantity: 1 },
    { id: 2, name: 'PayPal Business', type: 'PayPal Account', balance: '$45,000', price: 750, quantity: 2 },
    { id: 3, name: 'Visa Platinum', type: 'Credit Card', balance: '$50,000', price: 800, quantity: 1 },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

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
          <h1 className="text-3xl font-cyber font-bold text-cyber-light mb-4 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8" />
            Shopping Cart
          </h1>
          <p className="text-cyber-light/60">
            Review your selected items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
                <CardContent className="p-8 text-center">
                  <ShoppingCart className="h-16 w-16 text-cyber-light/30 mx-auto mb-4" />
                  <p className="text-cyber-light/60">Your cart is empty</p>
                </CardContent>
              </Card>
            ) : (
              cartItems.map((item, index) => (
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
                          <h3 className="text-cyber-light font-tech font-semibold">{item.name}</h3>
                          <p className="text-cyber-light/60 text-sm">{item.type}</p>
                          <p className="text-cyber-blue text-sm">Balance: {item.balance}</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-cyber-light font-tech w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-green-400 font-bold">${item.price * item.quantity}</p>
                            <p className="text-cyber-light/60 text-xs">${item.price} each</p>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 border-red-400/30 hover:bg-red-400 hover:text-white"
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
                  <span className="text-cyber-light/60">Subtotal</span>
                  <span className="text-cyber-light">${subtotal}</span>
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
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
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
