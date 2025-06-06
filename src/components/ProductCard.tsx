
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  balance: string;
  stock: number;
  country?: string;
  country_flag?: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const addToCart = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    setIsAddingToCart(true);
    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();

      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Add new item
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
        description: `${product.name} has been added to your cart`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="bg-cyber-darker/60 border-cyber-blue/30 hover:border-cyber-blue/60 transition-all duration-300 h-full">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Package className="h-8 w-8 text-cyber-blue" />
            <div className="flex items-center gap-2">
              {product.country && product.country_flag && (
                <span className="text-cyber-light/60 text-sm flex items-center gap-1">
                  {product.country_flag} {product.country}
                </span>
              )}
              <Badge variant="outline" className="text-cyber-light/60 border-cyber-blue/30">
                Stock: {product.stock}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-cyber-light font-tech">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-cyber-light/80 text-sm">
            {product.description}
          </p>
          
          {product.balance && (
            <div className="flex items-center justify-between">
              <span className="text-cyber-light/60 text-sm">Balance:</span>
              <span className="text-green-400 font-mono">{product.balance}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-400">
              ${product.price}
            </span>
            <Button
              onClick={addToCart}
              disabled={isAddingToCart || product.stock === 0}
              className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark"
            >
              {isAddingToCart ? (
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
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
