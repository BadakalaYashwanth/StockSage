
import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from './ui/card';

const dummyData = [
  { date: '2024-01', price: 150 },
  { date: '2024-02', price: 180 },
  { date: '2024-03', price: 160 },
  { date: '2024-04', price: 200 },
  { date: '2024-05', price: 190 },
  { date: '2024-06', price: 220 },
];

interface StockChartProps {
  className?: string;
}

export const StockChart = ({ className }: StockChartProps) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">AAPL Stock Price</h3>
        <p className="text-sm text-muted-foreground">Last 6 months performance</p>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dummyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date"
              tick={{ fill: '#64748B' }}
              tickLine={{ stroke: '#64748B' }}
            />
            <YAxis 
              tick={{ fill: '#64748B' }}
              tickLine={{ stroke: '#64748B' }}
              tickFormatter={(value) => `$${value}`}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '6px',
              }}
              labelStyle={{ color: '#F8FAFC' }}
              itemStyle={{ color: '#F8FAFC' }}
              formatter={(value: number) => [`$${value}`, 'Price']}
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
