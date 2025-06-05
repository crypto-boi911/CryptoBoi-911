
import { useState, useEffect } from 'react';

interface TierDiscount {
  bankLogs?: number;
  paypalLogs?: number;
  cashappLogs?: number;
}

interface TierInfo {
  level: number;
  name: string;
  minOrders: number;
  maxOrders: number;
  discounts: TierDiscount;
}

const tiers: TierInfo[] = [
  {
    level: 1,
    name: "Beginner",
    minOrders: 5,
    maxOrders: 14,
    discounts: { bankLogs: 10 }
  },
  {
    level: 2,
    name: "Amateur", 
    minOrders: 15,
    maxOrders: 29,
    discounts: { paypalLogs: 15, cashappLogs: 15 }
  },
  {
    level: 3,
    name: "Pro",
    minOrders: 30,
    maxOrders: 50,
    discounts: { bankLogs: 30, paypalLogs: 30, cashappLogs: 30 }
  }
];

export const useTierSystem = () => {
  const [completedOrders, setCompletedOrders] = useState(0);
  const [currentTier, setCurrentTier] = useState<TierInfo>(tiers[0]);

  useEffect(() => {
    const loadOrderCount = () => {
      const storedOrders = localStorage.getItem('userCompletedOrders');
      const orders = storedOrders ? parseInt(storedOrders) : 0;
      setCompletedOrders(orders);

      const tier = tiers.find(t => orders >= t.minOrders && orders <= t.maxOrders) || tiers[tiers.length - 1];
      setCurrentTier(tier);
    };

    loadOrderCount();

    // Listen for order completion events
    const handleOrderComplete = () => {
      loadOrderCount();
    };

    window.addEventListener('orderCompleted', handleOrderComplete);
    return () => window.removeEventListener('orderCompleted', handleOrderComplete);
  }, []);

  const incrementCompletedOrders = () => {
    const newCount = completedOrders + 1;
    localStorage.setItem('userCompletedOrders', newCount.toString());
    setCompletedOrders(newCount);
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('orderCompleted'));
  };

  const getDiscount = (category: string): number => {
    const categoryKey = category.toLowerCase().replace(/\s+/g, '') as keyof TierDiscount;
    return currentTier.discounts[categoryKey] || 0;
  };

  const applyDiscount = (price: number, category: string): { originalPrice: number; discountedPrice: number; discount: number } => {
    const discount = getDiscount(category);
    const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;
    
    return {
      originalPrice: price,
      discountedPrice: Math.round(discountedPrice * 100) / 100,
      discount
    };
  };

  return {
    completedOrders,
    currentTier,
    getDiscount,
    applyDiscount,
    incrementCompletedOrders
  };
};
