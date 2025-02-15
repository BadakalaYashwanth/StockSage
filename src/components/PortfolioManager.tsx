
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Plus, Star, StarOff, Bell } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface PortfolioManagerProps {
  symbol: string;
  className?: string;
}

export const PortfolioManager = ({ symbol, className }: PortfolioManagerProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch stock ID
  const { data: stockData } = useQuery({
    queryKey: ['stock', symbol],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stocks')
        .select('id')
        .eq('symbol', symbol)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session
  });

  // Check if stock is in watchlist
  const { data: watchlistData } = useQuery({
    queryKey: ['watchlist', symbol],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('watchlist')
        .select('id')
        .eq('stock_id', stockData?.id)
        .eq('user_id', session?.user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!session && !!stockData?.id
  });

  // Check if stock has price alert
  const { data: alertData } = useQuery({
    queryKey: ['alert', symbol],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('price_alerts')
        .select('id')
        .eq('stock_id', stockData?.id)
        .eq('user_id', session?.user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!session && !!stockData?.id
  });

  // Mutations
  const watchlistMutation = useMutation({
    mutationFn: async (action: 'add' | 'remove') => {
      if (action === 'add') {
        const { error } = await supabase
          .from('watchlist')
          .insert({ stock_id: stockData?.id, user_id: session?.user.id });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('watchlist')
          .delete()
          .eq('stock_id', stockData?.id)
          .eq('user_id', session?.user.id);
        if (error) throw error;
      }
    },
    onSuccess: (_, action) => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', symbol] });
      toast({
        title: action === 'add' ? "Added to Watchlist" : "Removed from Watchlist",
        description: `${symbol} has been ${action === 'add' ? "added to" : "removed from"} your watchlist`,
        duration: 2000,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const alertMutation = useMutation({
    mutationFn: async (action: 'add' | 'remove') => {
      if (action === 'add') {
        const { error } = await supabase
          .from('price_alerts')
          .insert({
            stock_id: stockData?.id,
            user_id: session?.user.id,
            target_price: 0, // This should be set based on user input
            alert_type: 'above'
          });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('price_alerts')
          .delete()
          .eq('stock_id', stockData?.id)
          .eq('user_id', session?.user.id);
        if (error) throw error;
      }
    },
    onSuccess: (_, action) => {
      queryClient.invalidateQueries({ queryKey: ['alert', symbol] });
      toast({
        title: action === 'add' ? "Alert Set" : "Alert Removed",
        description: `Price alert for ${symbol} has been ${action === 'add' ? "set" : "removed"}`,
        duration: 2000,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  if (!session) {
    return (
      <Card className={`p-6 glass-card ${className}`}>
        <div className="text-center">
          <p>Please sign in to manage your portfolio</p>
          <Button className="mt-4" onClick={() => window.location.href = '/auth'}>
            Sign In
          </Button>
        </div>
      </Card>
    );
  }

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
            onClick={() => watchlistMutation.mutate(watchlistData ? 'remove' : 'add')}
          >
            {watchlistData ? (
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
            onClick={() => alertMutation.mutate(alertData ? 'remove' : 'add')}
          >
            <Bell className="w-4 h-4" />
            {alertData ? "Remove Alert" : "Set Alert"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
