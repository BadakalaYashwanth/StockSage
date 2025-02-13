
import { StockChart } from "@/components/StockChart";
import { MarketSentiment } from "@/components/MarketSentiment";
import { StockStats } from "@/components/StockStats";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      <div className="container py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">StockSage</h1>
          <p className="text-lg text-muted-foreground">AI-Powered Stock Market Predictions</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StockChart className="lg:col-span-2" />
          <div className="space-y-6">
            <MarketSentiment />
            <StockStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
