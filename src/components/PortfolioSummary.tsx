
import React, { useEffect } from 'react';
import { Card } from './ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { ReloadIcon } from '@radix-ui/react-icons';

export const PortfolioSummary = ({ className }: { className?: string }) => {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  const { data: portfolioData, isLoading } = useQuery({
    queryKey: ['portfolio-summary'],
    queryFn: async () => {
      const { data: portfolio, error } = await supabase
        .from('portfolio')
        .select(`
          quantity,
          average_price,
          stocks (
            symbol,
            company_name
          )
        `)
        .eq('user_id', session?.user.id);

      if (error) throw error;

      // Calculate total portfolio value
      const totalValue = portfolio.reduce((sum, position) => {
        return sum + (position.quantity * position.average_price);
      }, 0);

      return {
        positions: portfolio,
        totalValue,
      };
    },
    enabled: !!session,
  });

  useEffect(() => {
    const channel = supabase
      .channel('portfolio-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio',
          filter: `user_id=eq.${session?.user.id}`,
        },
        (payload) => {
          console.log('Portfolio update:', payload);
          queryClient.invalidateQueries({ queryKey: ['portfolio-summary'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user.id]);

  if (!session) {
    return null;
  }

  if (isLoading) {
    return (
      <Card className={`p-6 glass-card ${className}`}>
        <div className="flex items-center justify-center h-32">
          <ReloadIcon className="h-8 w-8 animate-spin" />
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 glass-card ${className}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Portfolio Summary</h3>
        <div className="text-2xl font-bold">
          ${portfolioData?.totalValue.toFixed(2)}
        </div>
        <div className="space-y-2">
          {portfolioData?.positions.map((position) => (
            <div key={position.stocks.symbol} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{position.stocks.symbol}</p>
                <p className="text-sm text-slate-400">{position.stocks.company_name}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {position.quantity} shares
                </p>
                <p className="text-sm text-slate-400">
                  Avg. ${position.average_price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
