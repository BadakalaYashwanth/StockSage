
import React from 'react';
import { StockChart } from "@/components/StockChart";
import { StockStats } from "@/components/StockStats";
import { TechnicalAnalysis } from "@/components/TechnicalAnalysis";
import { MarketAnalysis } from "@/components/MarketAnalysis";
import { MarketSentiment } from "@/components/MarketSentiment";
import { MarketScreener } from "@/components/MarketScreener";
import { NewsIntegration } from "@/components/NewsIntegration";
import { EconomicCalendar } from "@/components/EconomicCalendar";
import { CommunityDiscussion } from "@/components/CommunityDiscussion";

interface MainContentProps {
  selectedStock: string;
}

export const MainContent = ({ selectedStock }: MainContentProps) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <StockChart className="animate-fade-in" symbol={selectedStock} />
      <StockStats className="animate-fade-in [animation-delay:200ms]" symbol={selectedStock} />
      <TechnicalAnalysis className="animate-fade-in" symbol={selectedStock} />
      <MarketAnalysis symbol={selectedStock} />
      <MarketSentiment />
      <MarketScreener />
      <NewsIntegration symbol={selectedStock} />
      <EconomicCalendar />
      <CommunityDiscussion symbol={selectedStock} />
    </div>
  );
};
