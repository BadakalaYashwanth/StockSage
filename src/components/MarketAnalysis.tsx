
import React from 'react';
import { Card } from './ui/card';
import { AlertTriangle, TrendingDown, PieChart, TrendingUp, AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from 'recharts';
import { Progress } from './ui/progress';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MarketAnalysisProps {
  symbol: string;
}

export const MarketAnalysis = ({ symbol }: MarketAnalysisProps) => {
  const { toast } = useToast();

  const { data: analysisData, isLoading } = useQuery({
    queryKey: ['market-analysis', symbol],
    queryFn: async () => {
      try {
        const { data: stockData, error: stockError } = await supabase
          .from('stocks')
          .select('id')
          .eq('symbol', symbol)
          .single();

        if (stockError) throw stockError;

        const { data: prices, error: pricesError } = await supabase
          .from('stock_prices')
          .select('*')
          .eq('stock_id', stockData.id)
          .order('date', { ascending: true })
          .limit(30);

        if (pricesError) throw pricesError;

        // Calculate predictions using moving averages
        const predictedPrices = prices.map((price, index, array) => {
          const ma5 = index >= 4 ? array.slice(index - 4, index + 1).reduce((acc, p) => acc + p.close_price, 0) / 5 : price.close_price;
          const ma20 = index >= 19 ? array.slice(index - 19, index + 1).reduce((acc, p) => acc + p.close_price, 0) / 20 : price.close_price;
          
          return {
            date: new Date(price.date).toLocaleDateString(),
            actual: price.close_price,
            predicted: (ma5 + ma20) / 2,
            volume: price.volume,
          };
        });

        // Calculate market sentiment
        const lastPrice = prices[prices.length - 1];
        const sentiment = lastPrice.close_price > lastPrice.open_price ? 75 : 45;

        // Generate technical indicators
        const indicators = [
          {
            name: 'RSI',
            value: calculateRSI(prices),
            interpretation: calculateRSI(prices) > 70 ? 'Overbought' : calculateRSI(prices) < 30 ? 'Oversold' : 'Neutral'
          },
          {
            name: 'MACD',
            value: calculateMACD(prices),
            interpretation: calculateMACD(prices) > 0 ? 'Bullish' : 'Bearish'
          },
          {
            name: 'Moving Average',
            value: ma20(prices),
            interpretation: lastPrice.close_price > ma20(prices) ? 'Above' : 'Below'
          }
        ];

        return {
          sentiment,
          prediction: {
            trend: lastPrice.close_price > lastPrice.open_price ? 'bullish' : 'bearish',
            confidence: Math.round(Math.abs((lastPrice.close_price - lastPrice.open_price) / lastPrice.open_price * 100)),
            targetPrice: lastPrice.close_price * (1 + (Math.random() * 0.1 - 0.05)),
          },
          indicators,
          historicalData: predictedPrices,
        };
      } catch (error) {
        console.error('Error fetching market analysis:', error);
        toast({
          title: "Error",
          description: "Failed to fetch market analysis. Please try again.",
          variant: "destructive",
        });
        return null;
      }
    },
  });

  if (isLoading || !analysisData) {
    return (
      <Card className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-800 rounded w-1/3"></div>
          <div className="h-[200px] bg-slate-800 rounded"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-slate-800 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 70) return 'text-green-500';
    if (sentiment <= 30) return 'text-red-500';
    return 'text-yellow-500';
  };

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
          <div className="text-sm font-medium">AI Confidence</div>
          <div className="text-2xl font-bold text-blue-500">
            {analysisData.prediction.confidence}%
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Market Sentiment</span>
            <span className={`text-sm font-medium ${getSentimentColor(analysisData.sentiment)}`}>
              {analysisData.sentiment}%
            </span>
          </div>
          <Progress value={analysisData.sentiment} className="h-2" />
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer>
            <AreaChart data={analysisData.historicalData}>
              <defs>
                <linearGradient id="actual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="predicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
                dataKey="actual"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#actual)"
                name="Actual"
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#60A5FA"
                fillOpacity={1}
                fill="url(#predicted)"
                name="Predicted"
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {analysisData.indicators.map((indicator) => (
            <div
              key={indicator.name}
              className="p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-colors"
            >
              <div className="text-sm text-slate-400">{indicator.name}</div>
              <div className="text-lg font-semibold">{typeof indicator.value === 'number' ? indicator.value.toFixed(2) : indicator.value}</div>
              <div className="text-sm text-slate-400">
                {indicator.interpretation}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-blue-500" />
            <span className="font-medium">AI Prediction</span>
          </div>
          <div className="flex items-center gap-2">
            {analysisData.prediction.trend === 'bullish' ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm">
              Target Price: ${analysisData.prediction.targetPrice.toFixed(2)} ({analysisData.prediction.trend})
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Helper functions for technical analysis
const calculateRSI = (prices: any[], period = 14) => {
  if (prices.length < period) return 50;
  
  let gains = 0;
  let losses = 0;
  
  for (let i = prices.length - period; i < prices.length; i++) {
    const difference = prices[i].close_price - prices[i-1]?.close_price;
    if (difference >= 0) {
      gains += difference;
    } else {
      losses -= difference;
    }
  }
  
  const averageGain = gains / period;
  const averageLoss = losses / period;
  
  if (averageLoss === 0) return 100;
  
  const rs = averageGain / averageLoss;
  return 100 - (100 / (1 + rs));
};

const calculateMACD = (prices: any[]) => {
  if (prices.length < 26) return 0;
  
  const ema12 = calculateEMA(prices.map(p => p.close_price), 12);
  const ema26 = calculateEMA(prices.map(p => p.close_price), 26);
  
  return ema12 - ema26;
};

const calculateEMA = (prices: number[], period: number) => {
  const multiplier = 2 / (period + 1);
  let ema = prices[0];
  
  for (let i = 1; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema;
  }
  
  return ema;
};

const ma20 = (prices: any[]) => {
  if (prices.length < 20) return prices[prices.length - 1]?.close_price || 0;
  const last20 = prices.slice(-20);
  return last20.reduce((sum, price) => sum + price.close_price, 0) / 20;
};

