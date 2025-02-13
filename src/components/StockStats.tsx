
import React from 'react';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatItemProps {
  label: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
}

const StatItem = ({ label, value, change }: StatItemProps) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm text-slate-400">{label}</span>
    <div className="flex items-center gap-2">
      <span className="font-mono font-medium text-slate-200">{value}</span>
      {change && (
        <span className={`flex items-center text-sm ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {change.value}
        </span>
      )}
    </div>
  </div>
);

interface StockStatsProps {
  className?: string;
  symbol: string;
}

export const StockStats = ({ className, symbol }: StockStatsProps) => {
  // Simulated data - in a real app, this would come from an API
  const generateRandomPrice = (base: number) => base + (Math.random() * 10 - 5);
  const basePrice = {
    'AAPL': 150, 'MSFT': 250, 'GOOGL': 120, 'AMZN': 100,
    'META': 200, 'TSLA': 180, 'NVDA': 400, 'JPM': 140,
    'V': 220, 'WMT': 160, 'PG': 140, 'JNJ': 170,
    'UNH': 450, 'HD': 300, 'BAC': 35
  }[symbol] || 100;

  const openPrice = generateRandomPrice(basePrice);
  const closePrice = generateRandomPrice(basePrice);
  const priceChange = closePrice - openPrice;
  const percentageChange = (priceChange / openPrice) * 100;
  const volume = Math.floor(Math.random() * 10000000) + 1000000;
  const dayHigh = Math.max(openPrice, closePrice) + Math.random() * 2;
  const dayLow = Math.min(openPrice, closePrice) - Math.random() * 2;

  return (
    <Card className={`p-6 glass-card ${className}`}>
      <h3 className="text-lg font-semibold mb-4">{symbol} Key Statistics</h3>
      <div className="space-y-2">
        <StatItem 
          label="Open" 
          value={`$${openPrice.toFixed(2)}`} 
        />
        <Separator className="bg-slate-800" />
        <StatItem 
          label="Close" 
          value={`$${closePrice.toFixed(2)}`}
          change={{
            value: `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(2)}%`,
            isPositive: percentageChange >= 0
          }}
        />
        <Separator className="bg-slate-800" />
        <StatItem 
          label="Day High" 
          value={`$${dayHigh.toFixed(2)}`} 
        />
        <Separator className="bg-slate-800" />
        <StatItem 
          label="Day Low" 
          value={`$${dayLow.toFixed(2)}`} 
        />
        <Separator className="bg-slate-800" />
        <StatItem 
          label="Volume" 
          value={`${(volume / 1000000).toFixed(2)}M`} 
        />
        <Separator className="bg-slate-800" />
        <StatItem 
          label="Price Change" 
          value={`$${Math.abs(priceChange).toFixed(2)}`}
          change={{
            value: `${priceChange >= 0 ? '+' : '-'}$${Math.abs(priceChange).toFixed(2)}`,
            isPositive: priceChange >= 0
          }}
        />
      </div>
    </Card>
  );
};
