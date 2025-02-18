
import { useState } from "react";
import { useToast } from '@/hooks/use-toast';
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MainContent } from "@/components/dashboard/MainContent";
import { FeatureSection } from "@/components/dashboard/FeatureSection";
import { featureSectionsData } from "@/components/dashboard/featureSectionsData";

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
        <DashboardHeader onStockSelect={handleStockSelect} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MainContent selectedStock={selectedStock} />
          
          <div className="space-y-6">
            {featureSectionsData.map((section, index) => (
              <FeatureSection
                key={section.title}
                {...section}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
