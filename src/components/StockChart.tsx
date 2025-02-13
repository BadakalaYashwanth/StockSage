
import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from './ui/card';

const generateDummyData = (symbol: string) => {
  const basePrice = {
    'AAPL': 150,
    'MSFT': 250,
    'GOOGL': 120,
    'AMZN': 100,
    'META': 200,
    'TSLA': 180,
    'NVDA': 400,
    'JPM': 140,
  }[symbol] || 100;

  return Array.from({ length: 6 }, (_, i) => ({
    date: `2024-${String(i + 1).padStart(2, '0')}`,
    price: basePrice + Math.random() * 50 - 25,
  }));
};

interface StockChartProps {
  className?: string;
  symbol: string;
}

export const StockChart = ({ className, symbol }: StockChartProps) => {
  const data = generateDummyData(symbol);

  return (
    <Card className={`p-6 glass-card ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{symbol} Stock Price</h3>
        <p className="text-sm text-slate-400">Last 6 months performance</p>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              dataKey="price"
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
