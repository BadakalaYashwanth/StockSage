
import React from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';

export const MarketSentiment = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Market Sentiment</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Bullish</span>
            <span className="text-sm text-success-500">65%</span>
          </div>
          <Progress 
            value={65} 
            className={cn("h-2", "bg-success-100")}
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Neutral</span>
            <span className="text-sm text-warning-500">25%</span>
          </div>
          <Progress 
            value={25} 
            className={cn("h-2", "bg-warning-100")}
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Bearish</span>
            <span className="text-sm text-danger-500">10%</span>
          </div>
          <Progress 
            value={10} 
            className={cn("h-2", "bg-danger-100")}
          />
        </div>
      </div>
    </Card>
  );
};
