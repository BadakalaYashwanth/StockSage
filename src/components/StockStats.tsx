
import React, { useEffect } from 'react';
import { Card } from './ui/card';
import { Loader2, TrendingUp, TrendingDown } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface StockStatsProps {
  symbol: string;
  className?: string;
}

export const StockStats = ({ symbol, className }: StockStatsProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: stockData, isLoading, error } = useQuery({
    queryKey: ['stock-stats', symbol],
    queryFn: async () => {
      console.log('Fetching stock data for symbol:', symbol);
      
      const { data: stock, error: stockError } = await supabase
        .from('stocks')
        .select('id, company_name, symbol')
        .eq('symbol', symbol)
        .maybeSingle();

      if (stockError) {
        console.error('Error fetching stock data:', stockError);
        throw new Error(`Failed to fetch stock data: ${stockError.message}`);
      }
      
      if (!stock) {
        console.error('Stock not found:', symbol);
        throw new Error(`Stock ${symbol} not found in database`);
      }

      console.log('Found stock:', stock);

      const { data: latestPrice, error: priceError } = await supabase
        .from('stock_prices')
        .select('*')
        .eq('stock_id', stock.id)
        .order('date', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (priceError) {
        console.error('Error fetching price data:', priceError);
        throw new Error(`Failed to fetch price data: ${priceError.message}`);
      }

      if (!latestPrice) {
        console.error('No price data found for stock:', symbol);
        throw new Error(`No price data available for ${symbol}`);
      }

      console.log('Found price data:', latestPrice);

      const priceChange = latestPrice.close_price - (latestPrice.previous_close_price || latestPrice.open_price);
      const percentageChange = ((priceChange / (latestPrice.previous_close_price || latestPrice.open_price)) * 100);

      return {
        ...stock,
        currentPrice: latestPrice.close_price,
        dayHigh: latestPrice.high_price,
        dayLow: latestPrice.low_price,
        volume: latestPrice.volume,
        priceChange,
        percentageChange,
      };
    },
    retry: 1,
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
          console.log('Real-time update received:', payload);
          queryClient.invalidateQueries({ queryKey: ['stock-stats', symbol] });
          toast({
            title: "Stock Price Updated",
            description: `Latest data for ${symbol} has been updated`,
            duration: 3000,
          });
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [symbol, stockData?.id, queryClient, toast]);

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
    console.error('Error in StockStats component:', error);
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
            <div className={`flex items-center gap-1 text-sm ${stockData?.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stockData?.priceChange >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>${Math.abs(stockData?.priceChange).toFixed(2)}</span>
              <span>({stockData?.percentageChange.toFixed(2)}%)</span>
            </div>
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
