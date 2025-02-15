
import { useState } from "react";
import { Link } from "react-router-dom";
import { StockChart } from "@/components/StockChart";
import { MarketSentiment } from "@/components/MarketSentiment";
import { StockStats } from "@/components/StockStats";
import { StockSearch } from "@/components/StockSearch";
import { TechnicalAnalysis } from "@/components/TechnicalAnalysis";
import { PortfolioManager } from "@/components/PortfolioManager";
import { UserProfile } from "@/components/UserProfile";
import { RiskManagement } from "@/components/RiskManagement";
import { MarketAnalysis } from "@/components/MarketAnalysis";
import { FinancialPlanner } from "@/components/FinancialPlanner";
import { CommunityDiscussion } from "@/components/CommunityDiscussion";
import { EconomicCalendar } from "@/components/EconomicCalendar";
import { NewsIntegration } from "@/components/NewsIntegration";
import { MarketScreener } from "@/components/MarketScreener";
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

const Index = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const { toast } = useToast();

  const handleStockSelect = (symbol: string) => {
    setSelectedStock(symbol);
    toast({
      title: "Stock Selected",
      description: `Loading data for ${symbol}...`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="container py-8 px-4 md:px-6">
        <header className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-200 to-slate-400 text-transparent bg-clip-text">
                StockSage
              </h1>
              <p className="text-lg text-slate-400">
                AI-Powered Stock Market Predictions
              </p>
            </div>
            <div className="flex items-center gap-4">
              <StockSearch onSelect={handleStockSelect} />
              <Link to="/mutual-funds">
                <Button variant="outline" className="gap-2">
                  <Activity className="w-4 h-4" />
                  Mutual Funds
                </Button>
              </Link>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StockChart className="animate-fade-in" symbol={selectedStock} />
            <TechnicalAnalysis className="animate-fade-in" symbol={selectedStock} />
            <MarketAnalysis symbol={selectedStock} />
            <NewsIntegration symbol={selectedStock} />
            <MarketScreener />
            <CommunityDiscussion symbol={selectedStock} />
          </div>
          <div className="space-y-6">
            <MarketSentiment />
            <StockStats className="animate-fade-in [animation-delay:200ms]" symbol={selectedStock} />
            <PortfolioManager className="animate-fade-in [animation-delay:400ms]" symbol={selectedStock} />
            <RiskManagement symbol={selectedStock} />
            <EconomicCalendar />
            <FinancialPlanner />
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
