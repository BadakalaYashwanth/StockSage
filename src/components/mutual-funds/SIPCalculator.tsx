
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const SIPCalculator = () => {
  const [investment, setInvestment] = useState('5000');
  const [duration, setDuration] = useState('10');
  const [expectedReturn, setExpectedReturn] = useState('12');

  const calculateSIP = () => {
    const P = parseFloat(investment);
    const t = parseFloat(duration);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const n = t * 12;

    const FV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return Math.round(FV);
  };

  const totalInvestment = parseFloat(investment) * parseFloat(duration) * 12;
  const estimatedReturns = calculateSIP() - totalInvestment;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Calculator className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold">SIP Calculator</h3>
          <p className="text-sm text-slate-400">Plan your mutual fund investments</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Monthly Investment (₹)</label>
          <Input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="bg-slate-900/50 border-slate-800"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Investment Period (Years)</label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="bg-slate-900/50 border-slate-800"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Expected Return (%)</label>
          <Input
            type="number"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            className="bg-slate-900/50 border-slate-800"
          />
        </div>
      </div>

      <div className="p-4 rounded-lg bg-slate-800/50 space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Total Investment</span>
            <span>₹{totalInvestment.toLocaleString()}</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Estimated Returns</span>
            <span className="text-green-500">₹{estimatedReturns.toLocaleString()}</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        <div className="pt-2 border-t border-slate-700">
          <div className="flex justify-between">
            <span className="font-medium">Total Value</span>
            <span className="font-medium text-blue-500">
              ₹{calculateSIP().toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
