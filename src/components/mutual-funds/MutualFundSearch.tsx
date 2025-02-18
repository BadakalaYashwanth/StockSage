
import React, { useState, useEffect } from 'react';
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
  ChevronDown,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { MutualFund, FundFilters } from './types';

interface MutualFundSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FundFilters) => void;
  onFundSelect: (fund: MutualFund) => void;
}

export const MutualFundSearch = ({ onSearch, onFilterChange, onFundSelect }: MutualFundSearchProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [funds, setFunds] = useState<MutualFund[]>([]);
  const [filters, setFilters] = useState<FundFilters>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFunds();
  }, [filters]);

  const fetchFunds = async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('mutual_funds').select('*');

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.risk_level) {
        query = query.eq('risk_level', filters.risk_level);
      }
      if (filters.fund_house) {
        query = query.eq('fund_house', filters.fund_house);
      }
      if (filters.min_fund_size) {
        query = query.gte('fund_size', filters.min_fund_size);
      }
      if (filters.max_fund_size) {
        query = query.lte('fund_size', filters.max_fund_size);
      }
      if (searchQuery) {
        query = query.or(`fund_name.ilike.%${searchQuery}%,fund_house.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      setFunds(data as MutualFund[]);
    } catch (error) {
      console.error('Error fetching funds:', error);
      toast({
        title: "Error",
        description: "Failed to fetch mutual funds. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
    fetchFunds();
  };

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
            onChange={(e) => handleSearch(e.target.value)}
            value={searchQuery}
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
                  <SelectItem value="Equity">Equity</SelectItem>
                  <SelectItem value="Debt">Debt</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Index">Index</SelectItem>
                  <SelectItem value="Liquid">Liquid</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleFilterChange('risk_level', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low Risk</SelectItem>
                  <SelectItem value="Medium">Medium Risk</SelectItem>
                  <SelectItem value="High">High Risk</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleFilterChange('fund_house', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Fund House" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HDFC">HDFC Mutual Fund</SelectItem>
                  <SelectItem value="SBI">SBI Mutual Fund</SelectItem>
                  <SelectItem value="ICICI">ICICI Prudential</SelectItem>
                  <SelectItem value="Axis">Axis Mutual Fund</SelectItem>
                  <SelectItem value="Kotak">Kotak Mahindra</SelectItem>
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
                  handleFilterChange('min_fund_size', min);
                  handleFilterChange('max_fund_size', max);
                }}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-slate-400">
                <span>₹{filters.min_fund_size?.toLocaleString() || '0'} Cr</span>
                <span>₹{filters.max_fund_size?.toLocaleString() || '100,000'} Cr</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {funds.length > 0 && (
          <div className="mt-4 space-y-2">
            {funds.map((fund) => (
              <div
                key={fund.id}
                className="p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer"
                onClick={() => onFundSelect(fund)}
              >
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
              </div>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-4 text-slate-400">
            Loading funds...
          </div>
        )}

        {!isLoading && funds.length === 0 && (
          <div className="text-center py-4 text-slate-400">
            No mutual funds found matching your criteria
          </div>
        )}
      </div>
    </Card>
  );
};
