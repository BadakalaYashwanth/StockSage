
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MutualFundSearch } from '@/components/mutual-funds/MutualFundSearch';
import { FundPerformance } from '@/components/mutual-funds/FundPerformance';
import { FundComposition } from '@/components/mutual-funds/FundComposition';
import { SIPCalculator } from '@/components/mutual-funds/SIPCalculator';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const MutualFunds = () => {
  const [selectedFund, setSelectedFund] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    // Simulate fund search
    if (query.length > 2) {
      setSelectedFund('HDFC001');
      toast({
        title: "Fund Found",
        description: "Loading fund details...",
        duration: 2000,
      });
    }
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    toast({
      title: "Filters Applied",
      description: "Updating fund list...",
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
            />
            {selectedFund && (
              <>
                <FundPerformance fundId={selectedFund} />
                <FundComposition fundId={selectedFund} />
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
