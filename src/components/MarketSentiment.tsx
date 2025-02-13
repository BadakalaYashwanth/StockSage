
import React from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

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
          <Progress value={65} className="bg-success-100" indicatorClassName="bg-success-500" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Neutral</span>
            <span className="text-sm text-warning-500">25%</span>
          </div>
          <Progress value={25} className="bg-warning-100" indicatorClassName="bg-warning-500" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Bearish</span>
            <span className="text-sm text-danger-500">10%</span>
          </div>
          <Progress value={10} className="bg-danger-100" indicatorClassName="bg-danger-500" />
        </div>
      </div>
    </Card>
  );
};
