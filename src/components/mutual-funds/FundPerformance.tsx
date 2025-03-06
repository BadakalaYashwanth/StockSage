
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, UserCheck, Activity } from 'lucide-react';

interface FundPerformanceProps {
  fundId: string;  // Changed from number to string
}

export const FundPerformance = ({ fundId }: FundPerformanceProps) => {
  const performanceData = {
    nav: 125.45,
    returns: {
      '1M': 2.5,
      '6M': 8.2,
      '1Y': 15.4,
      '3Y': 42.8,
      '5Y': 68.5,
    },
    riskMetrics: {
      standardDeviation: 12.8,
      sharpeRatio: 1.45,
      beta: 0.92,
    },
    manager: {
      name: "John Smith",
      experience: "15+ years",
      managingSince: "2018",
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Activity className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold">Fund Performance</h3>
          <p className="text-sm text-slate-400">Current NAV: ₹{performanceData.nav}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium">Historical Returns</h4>
          {Object.entries(performanceData.returns).map(([period, value]) => (
            <div key={period} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{period}</span>
                <span className={value >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {value}%
                </span>
              </div>
              <Progress value={Math.abs(value)} className="h-2" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Risk Metrics</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Standard Deviation</span>
                <span>{performanceData.riskMetrics.standardDeviation}%</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Sharpe Ratio</span>
                <span>{performanceData.riskMetrics.sharpeRatio}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Beta</span>
                <span>{performanceData.riskMetrics.beta}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Fund Manager</h4>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/50">
              <UserCheck className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium">{performanceData.manager.name}</div>
                <div className="text-sm text-slate-400">
                  Experience: {performanceData.manager.experience}
                </div>
                <div className="text-sm text-slate-400">
                  Managing since: {performanceData.manager.managingSince}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
