
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { PieChart, TrendingUp } from 'lucide-react';

export const FinancialPlanner = () => {
  const [initialInvestment, setInitialInvestment] = useState('1000');
  const [monthlyContribution, setMonthlyContribution] = useState('100');
  const [years, setYears] = useState('10');
  const [expectedReturn, setExpectedReturn] = useState('8');

  const calculateCompoundInterest = () => {
    const p = parseFloat(initialInvestment);
    const pmt = parseFloat(monthlyContribution);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const n = parseFloat(years) * 12;
    
    const futureValue = p * Math.pow(1 + r, n) + 
      pmt * ((Math.pow(1 + r, n) - 1) / r);
    
    return futureValue;
  };

  const futureValue = calculateCompoundInterest();
  const totalContributions = parseFloat(initialInvestment) + 
    (parseFloat(monthlyContribution) * parseFloat(years) * 12);
  const gains = futureValue - totalContributions;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <PieChart className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold">Financial Planner</h3>
          <p className="text-sm text-slate-400">Investment Calculator</p>
        </div>
      </div>

      <Tabs defaultValue="calculator">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Initial Investment ($)</label>
              <Input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Monthly Contribution ($)</label>
              <Input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Time Period (Years)</label>
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Expected Return (%)</label>
              <Input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-800/50">
              <div className="text-sm text-slate-400">Future Value</div>
              <div className="text-2xl font-bold text-green-500">
                ${Math.round(futureValue).toLocaleString()}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Initial Investment</span>
                <span>${parseFloat(initialInvestment).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Contributions</span>
                <span>${Math.round(totalContributions).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Investment Gains</span>
                <span className="text-green-500">${Math.round(gains).toLocaleString()}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Return on Investment</span>
                <span className="text-sm font-medium text-green-500">
                  {Math.round((gains / totalContributions) * 100)}%
                </span>
              </div>
              <Progress 
                value={(gains / totalContributions) * 100} 
                className="h-2" 
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
