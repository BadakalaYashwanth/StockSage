
import React from 'react';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface StatItemProps {
  label: string;
  value: string;
}

const StatItem = ({ label, value }: StatItemProps) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm text-slate-400">{label}</span>
    <span className="font-mono font-medium text-slate-200">{value}</span>
  </div>
);

interface StockStatsProps {
  className?: string;
  symbol: string;
}

interface StockPrice {
  open_price: number;
  close_price: number;
  high_price: number;
  low_price: number;
  volume: number;
}

export const StockStats = ({ className, symbol }: StockStatsProps) => {
  const { data: latestPrice } = useQuery({
    queryKey: ['latestPrice', symbol],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stock_prices')
        .select('open_price, close_price, high_price, low_price, volume')
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data as StockPrice;
    },
  });

  const formatPrice = (price?: number) => 
    price ? `$${price.toFixed(2)}` : '-';
  
  const formatVolume = (volume?: number) =>
    volume ? `${(volume / 1_000_000).toFixed(2)}M` : '-';

  const calculateChange = () => {
    if (!latestPrice) return { value: '-', isPositive: true };
    const change = latestPrice.close_price - latestPrice.open_price;
    const percentage = (change / latestPrice.open_price) * 100;
    const value = `${change >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
    return { value, isPositive: change >= 0 };
  };

  const change = calculateChange();

  return (
    <Card className={`p-6 glass-card ${className}`}>
      <h3 className="text-lg font-semibold mb-4">{symbol} Key Statistics</h3>
      <div className="space-y-2">
        <StatItem label="Open" value={formatPrice(latestPrice?.open_price)} />
        <Separator className="bg-slate-800" />
        <StatItem label="Close" value={formatPrice(latestPrice?.close_price)} />
        <Separator className="bg-slate-800" />
        <StatItem label="High" value={formatPrice(latestPrice?.high_price)} />
        <Separator className="bg-slate-800" />
        <StatItem label="Low" value={formatPrice(latestPrice?.low_price)} />
        <Separator className="bg-slate-800" />
        <StatItem label="Volume" value={formatVolume(latestPrice?.volume)} />
        <Separator className="bg-slate-800" />
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-slate-400">Change</span>
          <span className={`font-mono font-medium ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {change.value}
          </span>
        </div>
      </div>
    </Card>
  );
};
