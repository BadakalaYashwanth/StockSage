
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, BarChart, Briefcase } from 'lucide-react';

interface FundCompositionProps {
  fundId: string;
}

export const FundComposition = ({ fundId }: FundCompositionProps) => {
  const compositionData = {
    holdings: [
      { name: "HDFC Bank Ltd.", allocation: 8.5, type: "Equity" },
      { name: "Reliance Industries", allocation: 7.2, type: "Equity" },
      { name: "Infosys Ltd.", allocation: 6.8, type: "Equity" },
      { name: "Government Securities", allocation: 15.5, type: "Debt" },
      { name: "Corporate Bonds", allocation: 12.0, type: "Debt" },
    ],
    assetAllocation: {
      equity: 65,
      debt: 30,
      cash: 3,
      others: 2,
    },
    benchmarkComparison: {
      fundReturns: 15.4,
      benchmarkReturns: 14.2,
      benchmarkName: "NIFTY 50",
    },
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Briefcase className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold">Portfolio Composition</h3>
          <p className="text-sm text-slate-400">Holdings & Asset Allocation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-4">Top Holdings</h4>
          <div className="space-y-4">
            {compositionData.holdings.map((holding, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{holding.name}</span>
                  <span>{holding.allocation}%</span>
                </div>
                <Progress value={holding.allocation} className="h-2" />
                <div className="text-xs text-slate-400">{holding.type}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Asset Allocation</h4>
            <div className="space-y-4">
              {Object.entries(compositionData.assetAllocation).map(([asset, percentage]) => (
                <div key={asset} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{asset}</span>
                    <span>{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Benchmark Comparison</h4>
            <div className="p-4 rounded-lg bg-slate-800/50">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fund Returns (1Y)</span>
                  <span className="text-green-500">
                    {compositionData.benchmarkComparison.fundReturns}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{compositionData.benchmarkComparison.benchmarkName}</span>
                  <span className="text-blue-500">
                    {compositionData.benchmarkComparison.benchmarkReturns}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
