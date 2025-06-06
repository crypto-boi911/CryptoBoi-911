
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface TierInfo {
  name: string;
  level: number;
  minSpent: number;
  discounts: {
    banklogs: number;
    paypallogs: number;
    cashapplogs: number;
    cards: number;
  };
  benefits: string[];
}

const TIERS: TierInfo[] = [
  {
    name: 'Bronze',
    level: 1,
    minSpent: 0,
    discounts: { banklogs: 0, paypallogs: 0, cashapplogs: 0, cards: 0 },
    benefits: ['Basic support', 'Standard processing']
  },
  {
    name: 'Silver',
    level: 2,
    minSpent: 1000,
    discounts: { banklogs: 5, paypallogs: 5, cashapplogs: 5, cards: 3 },
    benefits: ['5% discount on logs', '3% discount on cards', 'Priority support']
  },
  {
    name: 'Gold',
    level: 3,
    minSpent: 5000,
    discounts: { banklogs: 10, paypallogs: 10, cashapplogs: 10, cards: 7 },
    benefits: ['10% discount on logs', '7% discount on cards', 'VIP support', 'Early access']
  },
  {
    name: 'Platinum',
    level: 4,
    minSpent: 15000,
    discounts: { banklogs: 15, paypallogs: 15, cashapplogs: 15, cards: 12 },
    benefits: ['15% discount on logs', '12% discount on cards', 'Dedicated manager', 'Custom requests']
  },
  {
    name: 'Diamond',
    level: 5,
    minSpent: 50000,
    discounts: { banklogs: 25, paypallogs: 25, cashapplogs: 25, cards: 20 },
    benefits: ['25% discount on logs', '20% discount on cards', 'Exclusive access', 'Custom solutions']
  }
];

export const useTierSystem = () => {
  const { user } = useAuth();
  const [totalSpent, setTotalSpent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserSpending = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: orders, error } = await supabase
          .from('orders')
          .select('total')
          .eq('user_id', user.id)
          .eq('status', 'completed');

        if (error) throw error;

        const total = orders?.reduce((sum, order) => sum + Number(order.total), 0) || 0;
        setTotalSpent(total);
      } catch (error) {
        console.error('Error fetching user spending:', error);
        setTotalSpent(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSpending();
  }, [user]);

  const getCurrentTier = (): TierInfo => {
    for (let i = TIERS.length - 1; i >= 0; i--) {
      if (totalSpent >= TIERS[i].minSpent) {
        return TIERS[i];
      }
    }
    return TIERS[0];
  };

  const getNextTier = (): TierInfo | null => {
    const currentTier = getCurrentTier();
    const nextTierIndex = TIERS.findIndex(tier => tier.level > currentTier.level);
    return nextTierIndex !== -1 ? TIERS[nextTierIndex] : null;
  };

  const getProgressToNextTier = (): number => {
    const nextTier = getNextTier();
    if (!nextTier) return 100;
    
    const currentTier = getCurrentTier();
    const progress = ((totalSpent - currentTier.minSpent) / (nextTier.minSpent - currentTier.minSpent)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const applyDiscount = (originalPrice: number, category: string) => {
    const currentTier = getCurrentTier();
    const discountKey = category as keyof typeof currentTier.discounts;
    const discount = currentTier.discounts[discountKey] || 0;
    const discountedPrice = originalPrice * (1 - discount / 100);
    
    return {
      originalPrice,
      discountedPrice,
      discount,
      savings: originalPrice - discountedPrice
    };
  };

  const incrementCompletedOrders = async () => {
    // This function can be used to trigger a refetch of user spending
    // when a new order is completed
    if (!user) return;

    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('total')
        .eq('user_id', user.id)
        .eq('status', 'completed');

      if (error) throw error;

      const total = orders?.reduce((sum, order) => sum + Number(order.total), 0) || 0;
      setTotalSpent(total);
    } catch (error) {
      console.error('Error refreshing user spending:', error);
    }
  };

  return {
    currentTier: getCurrentTier(),
    nextTier: getNextTier(),
    totalSpent,
    progressToNextTier: getProgressToNextTier(),
    applyDiscount,
    incrementCompletedOrders,
    isLoading,
    allTiers: TIERS
  };
};
