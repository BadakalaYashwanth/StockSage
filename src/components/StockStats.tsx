
import React from 'react';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

interface StatItemProps {
  label: string;
  value: string;
}

const StatItem = ({ label, value }: StatItemProps) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="font-mono font-medium">{value}</span>
  </div>
);

export const StockStats = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Key Statistics</h3>
      <div className="space-y-2">
        <StatItem label="Market Cap" value="$2.53T" />
        <Separator />
        <StatItem label="P/E Ratio" value="27.34" />
        <Separator />
        <StatItem label="52W High" value="$198.23" />
        <Separator />
        <StatItem label="52W Low" value="$124.17" />
        <Separator />
        <StatItem label="Volume" value="64.23M" />
        <Separator />
        <StatItem label="Avg Volume" value="57.85M" />
      </div>
    </Card>
  );
};
