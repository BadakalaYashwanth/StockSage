
import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from './ui/card';
import { DateRange } from 'react-day-picker';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface StockChartProps {
  className?: string;
  symbol: string;
  dateRange?: DateRange;
}

interface StockPriceData {
  date: string;
  open_price: number;
  close_price: number;
  high_price: number;
  low_price: number;
  volume: number;
}

const fetchStockPrices = async (symbol: string, dateRange?: DateRange) => {
  let query = supabase
    .from('stock_prices')
    .select('date, open_price, close_price, high_price, low_price, volume')
    .order('date', { ascending: true });

  if (dateRange?.from) {
    query = query.gte('date', dateRange.from.toISOString());
  }
  if (dateRange?.to) {
    query = query.lte('date', dateRange.to.toISOString());
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as StockPriceData[];
};

export const StockChart = ({ className, symbol, dateRange }: StockChartProps) => {
  const { data: stockPrices, isLoading } = useQuery({
    queryKey: ['stockPrices', symbol, dateRange],
    queryFn: () => fetchStockPrices(symbol, dateRange),
  });

  if (isLoading) {
    return (
      <Card className={`p-6 glass-card ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-700 rounded w-1/4"></div>
          <div className="h-[400px] bg-slate-700 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 glass-card ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{symbol} Stock Price</h3>
        <p className="text-sm text-slate-400">Historical price performance</p>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={stockPrices} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date"
              tick={{ fill: '#94A3B8' }}
              tickLine={{ stroke: '#94A3B8' }}
            />
            <YAxis 
              tick={{ fill: '#94A3B8' }}
              tickLine={{ stroke: '#94A3B8' }}
              tickFormatter={(value) => `$${value}`}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                border: '1px solid #1E293B',
                borderRadius: '6px',
              }}
              labelStyle={{ color: '#F8FAFC' }}
              itemStyle={{ color: '#F8FAFC' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Area
              type="monotone"
              dataKey="close_price"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
