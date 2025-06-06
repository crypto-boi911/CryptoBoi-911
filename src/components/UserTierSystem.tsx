
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Zap, Shield, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useTierSystem } from '@/hooks/useTierSystem';

interface UserTierSystemProps {
  compact?: boolean;
}

const UserTierSystem: React.FC<UserTierSystemProps> = ({ compact = false }) => {
  const { currentTier, nextTier, totalSpent, progressToNextTier, isLoading } = useTierSystem();

  const getTierIcon = (tierName: string) => {
    switch (tierName) {
      case 'Diamond': return <Crown className="h-5 w-5 text-purple-400" />;
      case 'Platinum': return <Star className="h-5 w-5 text-cyan-400" />;
      case 'Gold': return <Zap className="h-5 w-5 text-yellow-400" />;
      case 'Silver': return <Shield className="h-5 w-5 text-gray-400" />;
      default: return <Gift className="h-5 w-5 text-amber-600" />;
    }
  };

  const getTierColor = (tierName: string) => {
    switch (tierName) {
      case 'Diamond': return 'from-purple-500 to-pink-500';
      case 'Platinum': return 'from-cyan-400 to-blue-500';
      case 'Gold': return 'from-yellow-400 to-orange-500';
      case 'Silver': return 'from-gray-400 to-gray-600';
      default: return 'from-amber-600 to-amber-800';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-cyber-gray/50 border-cyber-blue/20">
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-cyber-blue/20 rounded w-3/4 mb-2"></div>
            <div className="h-2 bg-cyber-blue/20 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card className="bg-cyber-gray/50 border-cyber-blue/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {getTierIcon(currentTier.name)}
              <span className="font-tech text-cyber-light">{currentTier.name} Tier</span>
            </div>
            <span className="text-xs text-cyber-light/60">${totalSpent.toFixed(0)} spent</span>
          </div>
          {nextTier && (
            <>
              <Progress value={progressToNextTier} className="h-2 mb-1" />
              <p className="text-xs text-cyber-light/60">
                ${(nextTier.minSpent - totalSpent).toFixed(0)} to {nextTier.name}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
        <CardHeader>
          <CardTitle className="text-cyber-light font-tech flex items-center gap-2">
            {getTierIcon(currentTier.name)}
            Your Tier Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-2xl font-bold bg-gradient-to-r ${getTierColor(currentTier.name)} bg-clip-text text-transparent`}>
                {currentTier.name} Tier
              </h3>
              <p className="text-cyber-light/60">Total Spent: ${totalSpent.toFixed(2)}</p>
            </div>
            <Badge className={`bg-gradient-to-r ${getTierColor(currentTier.name)} text-white`}>
              Level {currentTier.level}
            </Badge>
          </div>

          {nextTier && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-cyber-light">Progress to {nextTier.name}</span>
                <span className="text-cyber-light">{progressToNextTier.toFixed(1)}%</span>
              </div>
              <Progress value={progressToNextTier} className="h-3" />
              <p className="text-cyber-light/60 text-sm">
                Spend ${(nextTier.minSpent - totalSpent).toFixed(2)} more to reach {nextTier.name} tier
              </p>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-cyber-light font-medium">Current Benefits:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentTier.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-cyber-light/80">
                  <div className="w-1.5 h-1.5 bg-cyber-blue rounded-full"></div>
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {(currentTier.discounts.banklogs > 0 || currentTier.discounts.cards > 0) && (
            <div className="space-y-2">
              <h4 className="text-cyber-light font-medium">Active Discounts:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {currentTier.discounts.banklogs > 0 && (
                  <div className="text-green-400">Bank Logs: {currentTier.discounts.banklogs}% off</div>
                )}
                {currentTier.discounts.paypallogs > 0 && (
                  <div className="text-green-400">PayPal: {currentTier.discounts.paypallogs}% off</div>
                )}
                {currentTier.discounts.cashapplogs > 0 && (
                  <div className="text-green-400">CashApp: {currentTier.discounts.cashapplogs}% off</div>
                )}
                {currentTier.discounts.cards > 0 && (
                  <div className="text-green-400">Cards: {currentTier.discounts.cards}% off</div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserTierSystem;
