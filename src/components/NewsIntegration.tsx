
import React from 'react';
import { Card } from './ui/card';
import { MessageSquare, TrendingUp, TrendingDown } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  source: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: string;
}

export const NewsIntegration = ({ symbol }: { symbol: string }) => {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: `${symbol} Announces Strong Q4 Results, Beats Analyst Expectations`,
      source: "Market Watch",
      timestamp: "1h ago",
      sentiment: "positive",
      impact: "+2.3%"
    },
    {
      id: 2,
      title: "Fed's Latest Policy Decision Impact on Tech Stocks",
      source: "Bloomberg",
      timestamp: "2h ago",
      sentiment: "neutral",
      impact: "0.5%"
    },
    {
      id: 3,
      title: "Market Volatility Increases Amid Global Tensions",
      source: "Reuters",
      timestamp: "3h ago",
      sentiment: "negative",
      impact: "-1.2%"
    }
  ];

  const getSentimentIcon = (sentiment: NewsItem['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-slate-400" />;
    }
  };

  const getSentimentColor = (sentiment: NewsItem['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <MessageSquare className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold">Market News</h3>
          <p className="text-sm text-slate-400">Latest Updates for {symbol}</p>
        </div>
      </div>

      <div className="space-y-4">
        {newsItems.map((news) => (
          <div key={news.id} className="p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="font-medium">{news.title}</div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.timestamp}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getSentimentIcon(news.sentiment)}
                <span className={`text-sm font-medium ${getSentimentColor(news.sentiment)}`}>
                  {news.impact}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
