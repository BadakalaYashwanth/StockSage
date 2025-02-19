
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import type { FundFilters } from '../types';

interface SearchFiltersProps {
  filters: FundFilters;
  onFilterChange: (key: keyof FundFilters, value: any) => void;
}

export const SearchFilters = ({ filters, onFilterChange }: SearchFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select onValueChange={(value) => onFilterChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Fund Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Equity">Equity</SelectItem>
            <SelectItem value="Debt">Debt</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="Index">Index</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onFilterChange('risk_level', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low Risk</SelectItem>
            <SelectItem value="Medium">Medium Risk</SelectItem>
            <SelectItem value="High">High Risk</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onFilterChange('fund_house', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Fund House" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HDFC Mutual Fund">HDFC Mutual Fund</SelectItem>
            <SelectItem value="SBI Mutual Fund">SBI Mutual Fund</SelectItem>
            <SelectItem value="ICICI Prudential">ICICI Prudential</SelectItem>
            <SelectItem value="Axis Mutual Fund">Axis Mutual Fund</SelectItem>
            <SelectItem value="Kotak Mahindra">Kotak Mahindra</SelectItem>
            <SelectItem value="Aditya Birla">Aditya Birla</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Fund Size (AUM in Cr)</label>
        <Slider
          defaultValue={[0, 100000]}
          max={100000}
          step={1000}
          onValueChange={([min, max]) => {
            onFilterChange('min_fund_size', min);
            onFilterChange('max_fund_size', max);
          }}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-slate-400">
          <span>₹{filters.min_fund_size?.toLocaleString() || '0'} Cr</span>
          <span>₹{filters.max_fund_size?.toLocaleString() || '100,000'} Cr</span>
        </div>
      </div>
    </div>
  );
};
