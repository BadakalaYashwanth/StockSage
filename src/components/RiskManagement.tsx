
import React from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { AlertTriangle, TrendingDown, PieChart } from 'lucide-react';

export const RiskManagement = ({ symbol }: { symbol: string }) => {
  // Simulated risk metrics
  const riskMetrics = {
    volatility: 25,
    beta: 1.2,
    sharpeRatio: 1.5,
    maxDrawdown: 15,
  };

  const getRiskLevel = (volatility: number) => {
    if (volatility < 20) return { level: 'Low', color: 'bg-green-500' };
    if (volatility < 30) return { level: 'Medium', color: 'bg-yellow-500' };
    return { level: 'High', color: 'bg-red-500' };
  };

  const riskLevel = getRiskLevel(riskMetrics.volatility);

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <AlertTriangle className="w-8 h-8 text-yellow-500" />
        <div>
          <h3 className="text-lg font-semibold">Risk Analysis</h3>
          <p className="text-sm text-slate-400">{symbol} Risk Metrics</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Risk Level</span>
            <span className={`text-sm font-medium text-${riskLevel.color}`}>
              {riskLevel.level}
            </span>
          </div>
          <Progress value={riskMetrics.volatility} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-800/50">
            <div className="text-sm text-slate-400">Beta</div>
            <div className="text-lg font-semibold">{riskMetrics.beta}</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/50">
            <div className="text-sm text-slate-400">Sharpe Ratio</div>
            <div className="text-lg font-semibold">{riskMetrics.sharpeRatio}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <TrendingDown className="w-4 h-4" />
          <span>Max Drawdown: {riskMetrics.maxDrawdown}%</span>
        </div>
      </div>
    </Card>
  );
};
