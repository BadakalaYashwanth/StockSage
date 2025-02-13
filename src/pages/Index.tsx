
import { useState } from "react";
import { StockChart } from "@/components/StockChart";
import { MarketSentiment } from "@/components/MarketSentiment";
import { StockStats } from "@/components/StockStats";
import { StockSearch } from "@/components/StockSearch";
import { DateRangePicker } from "@/components/DateRangePicker";
import { useToast } from "@/components/ui/use-toast";
import { DateRange } from "react-day-picker";

const Index = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2020, 0, 1),
    to: new Date(),
  });
  const { toast } = useToast();

  const handleStockSelect = (symbol: string) => {
    setSelectedStock(symbol);
    toast({
      title: "Stock Selected",
      description: `Loading data for ${symbol}...`,
      duration: 2000,
    });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    toast({
      title: "Date Range Updated",
      description: "Updating stock data...",
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
            <div className="flex flex-col md:flex-row gap-4">
              <StockSearch onSelect={handleStockSelect} />
              <DateRangePicker onChange={handleDateRangeChange} />
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StockChart 
            className="lg:col-span-2 animate-fade-in" 
            symbol={selectedStock} 
            dateRange={dateRange}
          />
          <div className="space-y-6">
            <MarketSentiment />
            <StockStats 
              className="animate-fade-in [animation-delay:200ms]" 
              symbol={selectedStock} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
