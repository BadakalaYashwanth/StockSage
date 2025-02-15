
import React, { useEffect } from 'react';
import { Card } from './ui/card';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface StockStatsProps {
  symbol: string;
  className?: string;
}

export const StockStats = ({ symbol, className }: StockStatsProps) => {
  const { data: stockData, isLoading } = useQuery({
    queryKey: ['stock-stats', symbol],
    queryFn: async () => {
      const { data: stock, error: stockError } = await supabase
        .from('stocks')
        .select('id, company_name')
        .eq('symbol', symbol)
        .single();

      if (stockError) throw stockError;

      const { data: latestPrice, error: priceError } = await supabase
        .from('stock_prices')
        .select('*')
        .eq('stock_id', stock.id)
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (priceError) throw priceError;

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
          // Invalidate the query to refresh the data
          queryClient.invalidateQueries({ queryKey: ['stock-stats', symbol] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [symbol, stockData?.id]);

  if (isLoading) {
    return (
      <Card className={`p-6 glass-card ${className}`}>
        <div className="flex items-center justify-center h-32">
          <ReloadIcon className="h-8 w-8 animate-spin" />
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
