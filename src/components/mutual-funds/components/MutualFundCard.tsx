
import React from 'react';
import { TrendingUp, CircleDollarSign, BarChart3, Calendar } from 'lucide-react';
import type { MutualFund } from '../types';

interface MutualFundCardProps {
  fund: MutualFund;
  onClick: (fund: MutualFund) => void;
}

const calculateReturns = (performances?: Array<{ nav: number; date: string }>) => {
  if (!performances || performances.length < 2) return 0;
  
  const sortedPerformances = [...performances].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const latest = sortedPerformances[0].nav;
  const oldest = sortedPerformances[sortedPerformances.length - 1].nav;
  
  return ((latest - oldest) / oldest * 100).toFixed(2);
};

export const MutualFundCard = ({ fund, onClick }: MutualFundCardProps) => {
  return (
    <div
      className="p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer"
      onClick={() => onClick(fund)}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium">{fund.fund_name}</h4>
            <p className="text-sm text-slate-400">{fund.fund_house}</p>
          </div>
          <div className="text-right">
            <span className={`text-sm px-2 py-1 rounded-full ${
              fund.risk_level === 'High' ? 'bg-red-500/20 text-red-300' :
              fund.risk_level === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-green-500/20 text-green-300'
            }`}>
              {fund.risk_level} Risk
            </span>
            <p className="text-sm text-slate-400 mt-1">₹{fund.fund_size.toLocaleString()} Cr</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-xs text-slate-400">Returns (3Y)</p>
              <p className="font-medium">{calculateReturns(fund.fund_performance)}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CircleDollarSign className="w-4 h-4 text-green-400" />
            <div>
              <p className="text-xs text-slate-400">Expense Ratio</p>
              <p className="font-medium">{fund.expense_ratio || 0}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <div>
              <p className="text-xs text-slate-400">Category</p>
              <p className="font-medium">{fund.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-400" />
            <div>
              <p className="text-xs text-slate-400">Launch Date</p>
              <p className="font-medium">
                {fund.launch_date ? new Date(fund.launch_date).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {fund.fund_composition && fund.fund_composition.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {fund.fund_composition.map((composition, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300"
              >
                {composition.asset_type}: {composition.percentage}%
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
