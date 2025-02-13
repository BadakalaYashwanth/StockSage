
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Plus, Star, StarOff, Bell } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface PortfolioManagerProps {
  symbol: string;
  className?: string;
}

export const PortfolioManager = ({ symbol, className }: PortfolioManagerProps) => {
  const [isWatchlisted, setIsWatchlisted] = React.useState(false);
  const [hasAlert, setHasAlert] = React.useState(false);
  const { toast } = useToast();

  const handleAddToWatchlist = () => {
    setIsWatchlisted(!isWatchlisted);
    toast({
      title: isWatchlisted ? "Removed from Watchlist" : "Added to Watchlist",
      description: `${symbol} has been ${isWatchlisted ? "removed from" : "added to"} your watchlist`,
      duration: 2000,
    });
  };

  const handleSetAlert = () => {
    setHasAlert(!hasAlert);
    toast({
      title: hasAlert ? "Alert Removed" : "Alert Set",
      description: `Price alert for ${symbol} has been ${hasAlert ? "removed" : "set"}`,
      duration: 2000,
    });
  };

  return (
    <Card className={`p-6 glass-card ${className}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Portfolio Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Buy Order",
                description: `Initiated buy order for ${symbol}`,
                duration: 2000,
              });
            }}
          >
            <Plus className="w-4 h-4" />
            Buy
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20"
            onClick={() => {
              toast({
                title: "Sell Order",
                description: `Initiated sell order for ${symbol}`,
                duration: 2000,
              });
            }}
          >
            <Plus className="w-4 h-4" />
            Sell
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={handleAddToWatchlist}
          >
            {isWatchlisted ? (
              <>
                <StarOff className="w-4 h-4" />
                Unwatch
              </>
            ) : (
              <>
                <Star className="w-4 h-4" />
                Watch
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={handleSetAlert}
          >
            <Bell className="w-4 h-4" />
            {hasAlert ? "Remove Alert" : "Set Alert"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
