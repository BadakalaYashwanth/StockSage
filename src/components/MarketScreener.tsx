
import React from 'react';
import { Card } from './ui/card';
import { PieChart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface ScreenedStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  marketCap: string;
  pe: number;
}

export const MarketScreener = () => {
  const [filter, setFilter] = React.useState({
    priceRange: 'all',
    marketCap: 'all',
    sector: 'all'
  });

  const screenedStocks: ScreenedStock[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.84,
      change: 2.3,
      volume: "62.5M",
      marketCap: "2.8T",
      pe: 28.5
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 328.79,
      change: 1.8,
      volume: "45.2M",
      marketCap: "2.4T",
      pe: 32.1
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 125.23,
      change: -0.5,
      volume: "28.9M",
      marketCap: "1.5T",
      pe: 25.4
    }
  ];

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <PieChart className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold">Market Screener</h3>
          <p className="text-sm text-slate-400">Filter & Find Stocks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select onValueChange={(value) => setFilter({ ...filter, priceRange: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-50">$0 - $50</SelectItem>
            <SelectItem value="50-200">$50 - $200</SelectItem>
            <SelectItem value="200+">$200+</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setFilter({ ...filter, marketCap: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Market Cap" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Caps</SelectItem>
            <SelectItem value="large">Large Cap</SelectItem>
            <SelectItem value="mid">Mid Cap</SelectItem>
            <SelectItem value="small">Small Cap</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setFilter({ ...filter, sector: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sectors</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {screenedStocks.map((stock) => (
          <div key={stock.symbol} className="p-4 rounded-lg bg-slate-800/50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-sm text-slate-400">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">${stock.price}</div>
                <div className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm mt-4">
              <div>
                <span className="text-slate-400">Volume: </span>
                <span>{stock.volume}</span>
              </div>
              <div>
                <span className="text-slate-400">Market Cap: </span>
                <span>{stock.marketCap}</span>
              </div>
              <div>
                <span className="text-slate-400">P/E: </span>
                <span>{stock.pe}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
