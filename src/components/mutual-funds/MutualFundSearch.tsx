
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface MutualFundSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

export const MutualFundSearch = ({ onSearch, onFilterChange }: MutualFundSearchProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Search className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold">Find Mutual Funds</h3>
          <p className="text-sm text-slate-400">Search by name, fund house, or category</p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Search mutual funds..."
          onChange={(e) => onSearch(e.target.value)}
          className="bg-slate-900/50 border-slate-800"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select onValueChange={(value) => onFilterChange({ category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Fund Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="equity">Equity</SelectItem>
              <SelectItem value="debt">Debt</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="index">Index</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onFilterChange({ risk: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onFilterChange({ returns: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Returns Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1Y">1 Year</SelectItem>
              <SelectItem value="3Y">3 Years</SelectItem>
              <SelectItem value="5Y">5 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};
