
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MutualFundSearch } from '@/components/mutual-funds/MutualFundSearch';
import { FundPerformance } from '@/components/mutual-funds/FundPerformance';
import { FundComposition } from '@/components/mutual-funds/FundComposition';
import { SIPCalculator } from '@/components/mutual-funds/SIPCalculator';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { MutualFund, FundFilters } from '@/components/mutual-funds/types';

const MutualFunds = () => {
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    if (query.length > 2) {
      console.log('Searching for funds:', query);
    }
  };

  const handleFilterChange = (filters: FundFilters) => {
    console.log('Applying filters:', filters);
  };

  const handleFundSelect = (fund: MutualFund) => {
    setSelectedFund(fund);
    toast({
      title: "Fund Selected",
      description: `Loading details for ${fund.fund_name}...`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="container py-8 px-4 md:px-6">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Stocks
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-200 to-slate-400 text-transparent bg-clip-text">
            Mutual Funds
          </h1>
          <p className="text-lg text-slate-400">
            Discover and analyze mutual funds for your portfolio
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MutualFundSearch
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onFundSelect={handleFundSelect}
            />
            {selectedFund && (
              <>
                <FundPerformance fundId={selectedFund.id} />
                <FundComposition fundId={selectedFund.id} />
              </>
            )}
          </div>
          <div className="space-y-6">
            <SIPCalculator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutualFunds;
