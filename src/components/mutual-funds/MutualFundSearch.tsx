
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Filter, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { SearchFilters } from './components/SearchFilters';
import { MutualFundCard } from './components/MutualFundCard';
import type { MutualFund, FundFilters } from './types';

interface MutualFundSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FundFilters) => void;
  onFundSelect: (fund: MutualFund) => void;
}

export const MutualFundSearch = ({ onSearch, onFilterChange, onFundSelect }: MutualFundSearchProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FundFilters>({});
  const { toast } = useToast();

  const { data: funds, isLoading } = useQuery({
    queryKey: ['mutual-funds', searchQuery, filters],
    queryFn: async () => {
      try {
        let query = supabase
          .from('mutual_funds')
          .select(`
            *,
            fund_performance!inner (
              nav,
              date,
              benchmark_value
            ),
            fund_composition!inner (
              asset_type,
              percentage,
              date
            )
          `);

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
          query = query.or(
            `fund_name.ilike.%${searchQuery}%,fund_house.ilike.%${searchQuery}%`
          );
        }

        const { data, error } = await query;
        if (error) throw error;
        return data as (MutualFund & {
          fund_performance: Array<{ nav: number; date: string; benchmark_value: number }>;
          fund_composition: Array<{ asset_type: string; percentage: number; date: string }>;
        })[];
      } catch (error) {
        console.error('Error fetching funds:', error);
        toast({
          title: "Error",
          description: "Failed to fetch mutual funds. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    },
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch(e.target.value);
            }}
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
          <CollapsibleContent className="pt-4">
            <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
          </CollapsibleContent>
        </Collapsible>

        <ScrollArea className="h-[600px] pr-4">
          {isLoading ? (
            <div className="text-center py-4 text-slate-400">
              Loading funds...
            </div>
          ) : funds && funds.length > 0 ? (
            <div className="space-y-4">
              {funds.map((fund) => (
                <MutualFundCard
                  key={fund.id}
                  fund={fund}
                  onClick={onFundSelect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-slate-400">
              No mutual funds found matching your criteria
            </div>
          )}
        </ScrollArea>
      </div>
    </Card>
  );
};
