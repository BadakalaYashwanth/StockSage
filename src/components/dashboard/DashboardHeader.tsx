
import React from 'react';
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockSearch } from "@/components/StockSearch";

interface DashboardHeaderProps {
  onStockSelect: (symbol: string) => void;
}

export const DashboardHeader = ({ onStockSelect }: DashboardHeaderProps) => {
  return (
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
          <StockSearch onSelect={onStockSelect} />
          <Link to="/mutual-funds">
            <Button variant="outline" className="gap-2">
              <Activity className="w-4 h-4" />
              Mutual Funds
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
