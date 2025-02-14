
import React from 'react';
import { Card } from './ui/card';
import { AlertTriangle, TrendingDown, PieChart } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Progress } from './ui/progress';

interface MarketAnalysisProps {
  symbol: string;
}

export const MarketAnalysis = ({ symbol }: MarketAnalysisProps) => {
  // Simulated AI analysis data
  const marketData = {
    sentiment: 75,
    prediction: {
      trend: 'bullish',
      confidence: 85,
      targetPrice: 180.50,
    },
    indicators: [
      { name: 'RSI', value: 65, interpretation: 'Neutral' },
      { name: 'MACD', value: 1.2, interpretation: 'Bullish' },
      { name: 'Moving Average', value: 175.30, interpretation: 'Above' },
    ],
  };

  // Simulated historical data
  const historicalData = Array.from({ length: 30 }, (_, i) => ({
    date: `2024-${String(i + 1).padStart(2, '0')}`,
    actual: 150 + Math.sin(i / 3) * 20,
    predicted: 150 + Math.sin((i + 2) / 3) * 20,
  }));

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PieChart className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold">AI Market Analysis</h3>
            <p className="text-sm text-slate-400">{symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">Confidence Score</div>
          <div className="text-2xl font-bold text-blue-500">
            {marketData.prediction.confidence}%
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Market Sentiment</span>
            <span className="text-sm font-medium text-blue-500">
              {marketData.sentiment}%
            </span>
          </div>
          <Progress value={marketData.sentiment} className="h-2" />
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer>
            <LineChart data={historicalData}>
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
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#10B981"
                name="Actual"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#60A5FA"
                name="Predicted"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {marketData.indicators.map((indicator) => (
            <div
              key={indicator.name}
              className="p-4 rounded-lg bg-slate-800/50"
            >
              <div className="text-sm text-slate-400">{indicator.name}</div>
              <div className="text-lg font-semibold">{indicator.value}</div>
              <div className="text-sm text-slate-400">
                {indicator.interpretation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
