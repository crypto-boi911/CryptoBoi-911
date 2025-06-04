
import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Smartphone, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const CardsLinkables = () => {
  const navigate = useNavigate();

  const cardProducts = [
    { 
      type: 'Credit Card', 
      brand: 'Visa Platinum', 
      limit: '$50,000', 
      price: '$800',
      features: ['High Limit', 'Verified', 'Premium']
    },
    { 
      type: 'Debit Card', 
      brand: 'Mastercard Gold', 
      limit: '$25,000', 
      price: '$450',
      features: ['Instant Access', 'Verified']
    },
    { 
      type: 'Virtual Card', 
      brand: 'American Express', 
      limit: '$75,000', 
      price: '$1200',
      features: ['Virtual', 'High Limit', 'Premium', 'Verified']
    },
    { 
      type: 'Prepaid Card', 
      brand: 'Visa Green', 
      limit: '$10,000', 
      price: '$200',
      features: ['Prepaid', 'Safe']
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-gradient p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border-cyber-blue/30 text-cyber-light hover:bg-cyber-blue/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="text-3xl font-cyber font-bold text-cyber-light mb-4">
            Cards & Linkables
          </h1>
          <p className="text-cyber-light/60">
            Credit cards, debit cards, and linkable payment methods
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-cyber-light font-tech">{product.brand}</CardTitle>
                      <p className="text-cyber-light/60 text-sm">{product.type}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-cyber-light/60">Limit:</span>
                      <span className="text-cyber-blue font-bold">{product.limit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-light/60">Price:</span>
                      <span className="text-green-400 font-bold">{product.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="text-xs border-cyber-blue/30 text-cyber-blue"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-cyber-blue/20 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CardsLinkables;
