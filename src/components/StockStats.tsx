
import React from 'react';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

interface StatItemProps {
  label: string;
  value: string;
}

const StatItem = ({ label, value }: StatItemProps) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm text-slate-400">{label}</span>
    <span className="font-mono font-medium text-slate-200">{value}</span>
  </div>
);

interface StockStatsProps {
  className?: string;
  symbol: string;
}

export const StockStats = ({ className, symbol }: StockStatsProps) => {
  return (
    <Card className={`p-6 glass-card ${className}`}>
      <h3 className="text-lg font-semibold mb-4">{symbol} Key Statistics</h3>
      <div className="space-y-2">
        <StatItem label="Market Cap" value="$2.53T" />
        <Separator className="bg-slate-800" />
        <StatItem label="P/E Ratio" value="27.34" />
        <Separator className="bg-slate-800" />
        <StatItem label="52W High" value="$198.23" />
        <Separator className="bg-slate-800" />
        <StatItem label="52W Low" value="$124.17" />
        <Separator className="bg-slate-800" />
        <StatItem label="Volume" value="64.23M" />
        <Separator className="bg-slate-800" />
        <StatItem label="Avg Volume" value="57.85M" />
      </div>
    </Card>
  );
};
