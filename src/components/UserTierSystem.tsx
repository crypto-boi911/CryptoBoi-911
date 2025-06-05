
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Crown } from 'lucide-react';

interface TierInfo {
  level: number;
  name: string;
  icon: React.ReactNode;
  color: string;
  minOrders: number;
  maxOrders: number;
  discounts: {
    bankLogs?: number;
    paypalLogs?: number;
    cashappLogs?: number;
  };
}

const tiers: TierInfo[] = [
  {
    level: 1,
    name: "Beginner",
    icon: <Star className="h-4 w-4" />,
    color: "text-yellow-400",
    minOrders: 0,
    maxOrders: 14,
    discounts: { bankLogs: 10 }
  },
  {
    level: 2,
    name: "Amateur", 
    icon: <Trophy className="h-4 w-4" />,
    color: "text-blue-400",
    minOrders: 15,
    maxOrders: 29,
    discounts: { paypalLogs: 15, cashappLogs: 15 }
  },
  {
    level: 3,
    name: "Pro",
    icon: <Crown className="h-4 w-4" />,
    color: "text-purple-400",
    minOrders: 30,
    maxOrders: 50,
    discounts: { bankLogs: 30, paypalLogs: 30, cashappLogs: 30 }
  }
];

interface UserTierSystemProps {
  compact?: boolean;
}

const UserTierSystem: React.FC<UserTierSystemProps> = ({ compact = false }) => {
  const [completedOrders, setCompletedOrders] = useState(0);
  const [currentTier, setCurrentTier] = useState<TierInfo>(tiers[0]);
  const [nextTier, setNextTier] = useState<TierInfo | null>(null);

  useEffect(() => {
    // Get completed orders from localStorage
    const storedOrders = localStorage.getItem('userCompletedOrders');
    const orders = storedOrders ? parseInt(storedOrders) : 0;
    setCompletedOrders(orders);

    // Calculate current tier
    const tier = tiers.find(t => orders >= t.minOrders && orders <= t.maxOrders) || tiers[tiers.length - 1];
    setCurrentTier(tier);

    // Calculate next tier
    const nextTierIndex = tiers.findIndex(t => t.level === tier.level) + 1;
    setNextTier(nextTierIndex < tiers.length ? tiers[nextTierIndex] : null);
  }, []);

  const getProgressPercentage = () => {
    if (!nextTier) return 100;
    const progress = ((completedOrders - currentTier.minOrders) / (nextTier.minOrders - currentTier.minOrders)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const ordersUntilNext = nextTier ? nextTier.minOrders - completedOrders : 0;

  if (compact) {
    return (
      <Card className="bg-cyber-gray/50 border-cyber-blue/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={currentTier.color}>
                {currentTier.icon}
              </div>
              <span className="text-cyber-light font-tech text-sm">
                Tier {currentTier.level}: {currentTier.name}
              </span>
            </div>
            <Badge variant="outline" className="text-cyber-blue border-cyber-blue/30">
              {completedOrders} orders
            </Badge>
          </div>
          <Progress value={getProgressPercentage()} className="h-2 mb-2" />
          {nextTier && (
            <p className="text-cyber-light/60 text-xs">
              {ordersUntilNext} more orders to {nextTier.name}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
      <CardHeader>
        <CardTitle className="text-cyber-light font-tech flex items-center gap-2">
          <div className={currentTier.color}>
            {currentTier.icon}
          </div>
          Tier System - {currentTier.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-cyber-light">Completed Orders:</span>
          <Badge variant="outline" className="text-cyber-blue border-cyber-blue/30">
            {completedOrders}
          </Badge>
        </div>

        {nextTier && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-cyber-light/60">Progress to {nextTier.name}</span>
              <span className="text-cyber-light/60">{ordersUntilNext} orders left</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-3" />
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-cyber-light font-tech text-sm">Current Benefits:</h4>
          <div className="space-y-1">
            {currentTier.discounts.bankLogs && (
              <div className="text-green-400 text-sm">
                • {currentTier.discounts.bankLogs}% off Bank Logs
              </div>
            )}
            {currentTier.discounts.paypalLogs && (
              <div className="text-green-400 text-sm">
                • {currentTier.discounts.paypalLogs}% off PayPal Logs
              </div>
            )}
            {currentTier.discounts.cashappLogs && (
              <div className="text-green-400 text-sm">
                • {currentTier.discounts.cashappLogs}% off CashApp Logs
              </div>
            )}
          </div>
        </div>

        {/* All Tiers Overview */}
        <div className="space-y-2 pt-4 border-t border-cyber-blue/20">
          <h4 className="text-cyber-light font-tech text-sm">All Tiers:</h4>
          {tiers.map((tier) => (
            <div key={tier.level} className={`flex items-center justify-between p-2 rounded ${
              tier.level === currentTier.level ? 'bg-cyber-blue/10 border border-cyber-blue/30' : 'bg-cyber-gray/20'
            }`}>
              <div className="flex items-center gap-2">
                <div className={tier.color}>
                  {tier.icon}
                </div>
                <span className="text-cyber-light text-sm">
                  {tier.name} ({tier.minOrders}-{tier.maxOrders} orders)
                </span>
              </div>
              <div className="text-xs text-cyber-light/60">
                {Object.entries(tier.discounts).map(([key, value]) => (
                  <div key={key}>{value}% off {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTierSystem;
