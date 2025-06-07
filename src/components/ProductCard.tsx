
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);
    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart')
        .select('id, quantity')
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
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="bg-cyber-darker/60 border-cyber-blue/30 hover:border-cyber-blue/60 transition-all duration-300 group h-full">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-lg font-cyber text-cyber-light group-hover:text-cyber-blue transition-colors">
              {product.name}
            </CardTitle>
            {product.country_flag && (
              <Badge variant="outline" className="border-cyber-blue/30 text-cyber-blue">
                {product.country_flag} {product.country}
              </Badge>
            )}
          </div>
          <p className="text-cyber-light/70 text-sm">
            {product.description}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-cyber-light/60 text-sm">Balance:</span>
              <span className="text-green-400 font-semibold">{product.balance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyber-light/60 text-sm">Stock:</span>
              <span className="text-cyber-light">{product.stock} available</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-cyber-blue/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-green-400">
                ${product.price.toFixed(2)}
              </span>
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
              className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech"
            >
              {isAdding ? (
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
