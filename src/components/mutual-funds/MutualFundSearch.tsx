
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Search,
  Filter,
  BarChart4,
  Calendar,
  TrendingUp,
  Shield,
  ChevronDown,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface MutualFundSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FundFilters) => void;
}

export interface FundFilters {
  category?: string;
  riskLevel?: string;
  returnPeriod?: string;
  minAUM?: number;
  maxAUM?: number;
  fundHouse?: string;
}

export const MutualFundSearch = ({ onSearch, onFilterChange }: MutualFundSearchProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FundFilters>({
    category: undefined,
    riskLevel: undefined,
    returnPeriod: undefined,
    minAUM: 0,
    maxAUM: 100000,
    fundHouse: undefined,
  });

  const handleFilterChange = (key: keyof FundFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

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
        <div className="flex gap-4">
          <Input
            placeholder="Search mutual funds..."
            onChange={(e) => onSearch(e.target.value)}
            className="flex-1 bg-slate-900/50 border-slate-800"
          />
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleContent className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Fund Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equity">Equity</SelectItem>
                  <SelectItem value="debt">Debt</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="index">Index</SelectItem>
                  <SelectItem value="liquid">Liquid</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleFilterChange('riskLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleFilterChange('returnPeriod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Returns Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1Y">1 Year</SelectItem>
                  <SelectItem value="3Y">3 Years</SelectItem>
                  <SelectItem value="5Y">5 Years</SelectItem>
                  <SelectItem value="10Y">10 Years</SelectItem>
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
                  handleFilterChange('minAUM', min);
                  handleFilterChange('maxAUM', max);
                }}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-slate-400">
                <span>₹{filters.minAUM?.toLocaleString()} Cr</span>
                <span>₹{filters.maxAUM?.toLocaleString()} Cr</span>
              </div>
            </div>

            <Select onValueChange={(value) => handleFilterChange('fundHouse', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Fund House" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hdfc">HDFC Mutual Fund</SelectItem>
                <SelectItem value="sbi">SBI Mutual Fund</SelectItem>
                <SelectItem value="icici">ICICI Prudential</SelectItem>
                <SelectItem value="axis">Axis Mutual Fund</SelectItem>
                <SelectItem value="kotak">Kotak Mahindra</SelectItem>
              </SelectContent>
            </Select>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {isFiltersOpen && (
        <div className="pt-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (value) {
              return (
                <Button
                  key={key}
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleFilterChange(key as keyof FundFilters, undefined)}
                >
                  {key === 'minAUM' || key === 'maxAUM' ? null : (
                    <>
                      {value}
                      <ChevronDown className="w-3 h-3" />
                    </>
                  )}
                </Button>
              );
            }
            return null;
          })}
        </div>
      )}
    </Card>
  );
};
