
import React from 'react';
import { Card } from './ui/card';
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  Bar,
  BarChart,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface TechnicalAnalysisProps {
  symbol: string;
  className?: string;
}

export const TechnicalAnalysis = ({ symbol, className }: TechnicalAnalysisProps) => {
  // Simulated data - in a real app, this would come from an API
  const generateData = () => {
    const basePrice = 100;
    return Array.from({ length: 30 }, (_, i) => ({
      date: `2024-${String(Math.floor(i / 30 * 12 + 1)).padStart(2, '0')}-${String(Math.floor(i % 30 + 1)).padStart(2, '0')}`,
      price: basePrice + Math.sin(i / 3) * 20 + Math.random() * 10,
      volume: Math.floor(Math.random() * 1000000) + 500000,
      rsi: 50 + Math.sin(i / 4) * 20,
      macd: Math.sin(i / 6) * 2,
      signal: Math.sin((i + 2) / 6) * 2,
    }));
  };

  const data = generateData();

  return (
    <Card className={`p-6 glass-card ${className}`}>
      <Tabs defaultValue="price">
        <TabsList className="grid w-full grid-cols-3 bg-slate-900/50">
          <TabsTrigger value="price">Price Analysis</TabsTrigger>
          <TabsTrigger value="momentum">Momentum</TabsTrigger>
          <TabsTrigger value="volume">Volume Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="price" className="space-y-4">
          <h3 className="text-lg font-semibold mt-4">Price Trends</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer>
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="date" tick={{ fill: '#94A3B8' }} />
                <YAxis tick={{ fill: '#94A3B8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #1E293B',
                    borderRadius: '6px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="price"
                  fill="url(#colorPrice)"
                  stroke="#10B981"
                />
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="momentum" className="space-y-4">
          <h3 className="text-lg font-semibold mt-4">RSI & MACD</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer>
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="date" tick={{ fill: '#94A3B8' }} />
                <YAxis tick={{ fill: '#94A3B8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #1E293B',
                    borderRadius: '6px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="rsi" stroke="#10B981" />
                <Line type="monotone" dataKey="macd" stroke="#60A5FA" />
                <Line type="monotone" dataKey="signal" stroke="#F59E0B" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="volume" className="space-y-4">
          <h3 className="text-lg font-semibold mt-4">Volume Analysis</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer>
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="date" tick={{ fill: '#94A3B8' }} />
                <YAxis tick={{ fill: '#94A3B8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #1E293B',
                    borderRadius: '6px',
                  }}
                />
                <Legend />
                <Bar dataKey="volume" fill="#60A5FA" opacity={0.8} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
