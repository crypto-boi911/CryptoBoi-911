
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UserDashboardLayout from '@/components/UserDashboardLayout';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/integrations/supabase/client';

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

const Tools = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'Tools')
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

  if (isLoading) {
    return (
      <UserDashboardLayout title="Tools" showBackButton>
        <div className="flex items-center justify-center py-12">
          <div className="text-cyber-blue text-xl">Loading products...</div>
        </div>
      </UserDashboardLayout>
    );
  }

  return (
    <UserDashboardLayout title="Tools" showBackButton>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-cyber text-cyber-light">
            Professional Security Tools
          </h2>
          <p className="text-cyber-light/70 max-w-2xl mx-auto">
            Advanced tools and utilities for cybersecurity professionals. 
            All tools are regularly updated and come with comprehensive documentation.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-cyber-light/60 mb-4">No products available</h3>
            <p className="text-cyber-light/40">Check back soon for new professional tools.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </motion.div>
    </UserDashboardLayout>
  );
};

export default Tools;
