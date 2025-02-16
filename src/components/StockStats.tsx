
import React, { useEffect } from 'react';
import { Card } from './ui/card';
import { Loader2 } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface StockStatsProps {
  symbol: string;
  className?: string;
}

export const StockStats = ({ symbol, className }: StockStatsProps) => {
  const queryClient = useQueryClient();

  const { data: stockData, isLoading, error } = useQuery({
    queryKey: ['stock-stats', symbol],
    queryFn: async () => {
      const { data: stock, error: stockError } = await supabase
        .from('stocks')
        .select('id, company_name')
        .eq('symbol', symbol)
        .maybeSingle();

      if (stockError) throw stockError;
      if (!stock) throw new Error(`Stock ${symbol} not found`);

      const { data: latestPrice, error: priceError } = await supabase
        .from('stock_prices')
        .select('*')
        .eq('stock_id', stock.id)
        .order('date', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (priceError) throw priceError;
      if (!latestPrice) throw new Error(`No price data available for ${symbol}`);

      return {
        ...stock,
        currentPrice: latestPrice.close_price,
        dayHigh: latestPrice.high_price,
        dayLow: latestPrice.low_price,
        volume: latestPrice.volume,
      };
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('stock-price-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stock_prices',
          filter: `stock_id=eq.${stockData?.id}`,
        },
        (payload) => {
          console.log('Real-time update:', payload);
          queryClient.invalidateQueries({ queryKey: ['stock-stats', symbol] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [symbol, stockData?.id, queryClient]);

  if (isLoading) {
    return (
      <Card className={`p-6 glass-card ${className}`}>
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-6 glass-card ${className}`}>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-red-500">Error Loading Stock Data</h3>
          <p className="text-sm text-slate-400">
            {error instanceof Error ? error.message : 'Failed to load stock data'}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 glass-card ${className}`}>
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{symbol}</h3>
            <p className="text-sm text-slate-400">{stockData?.company_name}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${stockData?.currentPrice.toFixed(2)}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-400">Day High</p>
            <p className="text-lg font-semibold">${stockData?.dayHigh.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Day Low</p>
            <p className="text-lg font-semibold">${stockData?.dayLow.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Volume</p>
            <p className="text-lg font-semibold">
              {stockData?.volume.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
