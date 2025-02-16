
import { useState } from "react";
import { Link } from "react-router-dom";
import { StockChart } from "@/components/StockChart";
import { MarketSentiment } from "@/components/MarketSentiment";
import { StockStats } from "@/components/StockStats";
import { StockSearch } from "@/components/StockSearch";
import { TechnicalAnalysis } from "@/components/TechnicalAnalysis";
import { PortfolioManager } from "@/components/PortfolioManager";
import { PortfolioSummary } from "@/components/PortfolioSummary";
import { UserProfile } from "@/components/UserProfile";
import { RiskManagement } from "@/components/RiskManagement";
import { MarketAnalysis } from "@/components/MarketAnalysis";
import { FinancialPlanner } from "@/components/FinancialPlanner";
import { CommunityDiscussion } from "@/components/CommunityDiscussion";
import { EconomicCalendar } from "@/components/EconomicCalendar";
import { NewsIntegration } from "@/components/NewsIntegration";
import { MarketScreener } from "@/components/MarketScreener";
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Activity, 
  ChartLine, 
  Wallet, 
  Brain, 
  Users, 
  Calendar,
  BarChart3,
  TrendingUp,
  Shield,
  BookOpen,
  MessageSquare,
  Globe
} from "lucide-react";

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

  const featureSections = [
    {
      title: "Market Analysis",
      icon: <ChartLine className="w-5 h-5 text-blue-500" />,
      description: "Real-time market analysis and stock performance tracking",
      features: [
        {
          name: "Stock Charts",
          icon: <BarChart3 className="w-4 h-4" />,
          description: "Interactive price charts with technical indicators"
        },
        {
          name: "Performance Stats",
          icon: <TrendingUp className="w-4 h-4" />,
          description: "Detailed stock statistics and performance metrics"
        },
        {
          name: "Technical Analysis",
          icon: <Activity className="w-4 h-4" />,
          description: "Advanced technical indicators and patterns"
        }
      ]
    },
    {
      title: "AI Insights",
      icon: <Brain className="w-5 h-5 text-green-500" />,
      description: "AI-powered market analysis and predictions",
      features: [
        {
          name: "Market Sentiment",
          icon: <Brain className="w-4 h-4" />,
          description: "AI-driven market sentiment analysis"
        },
        {
          name: "Stock Screening",
          icon: <Shield className="w-4 h-4" />,
          description: "Intelligent stock screening and recommendations"
        }
      ]
    },
    {
      title: "Portfolio Management",
      icon: <Wallet className="w-5 h-5 text-orange-500" />,
      description: "Comprehensive portfolio tracking and management tools",
      features: [
        {
          name: "Portfolio Overview",
          icon: <Wallet className="w-4 h-4" />,
          description: "Track your investments and performance"
        },
        {
          name: "Risk Analysis",
          icon: <Shield className="w-4 h-4" />,
          description: "Portfolio risk assessment and management"
        }
      ]
    },
    {
      title: "Market Events",
      icon: <Calendar className="w-5 h-5 text-yellow-500" />,
      description: "Stay updated with market events and news",
      features: [
        {
          name: "News Feed",
          icon: <Globe className="w-4 h-4" />,
          description: "Latest market news and updates"
        },
        {
          name: "Economic Calendar",
          icon: <Calendar className="w-4 h-4" />,
          description: "Important economic events and releases"
        }
      ]
    },
    {
      title: "Community",
      icon: <Users className="w-5 h-5 text-purple-500" />,
      description: "Connect with other investors and share insights",
      features: [
        {
          name: "Discussions",
          icon: <MessageSquare className="w-4 h-4" />,
          description: "Community discussions and insights"
        },
        {
          name: "Learning Resources",
          icon: <BookOpen className="w-4 h-4" />,
          description: "Educational content and trading guides"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="container py-8 px-4 md:px-6">
        {/* Header Section */}
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
              <StockSearch onSelect={handleStockSelect} />
              <Link to="/mutual-funds">
                <Button variant="outline" className="gap-2">
                  <Activity className="w-4 h-4" />
                  Mutual Funds
                </Button>
              </Link>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area - Market Analysis & Charts */}
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

          {/* Feature Sections Sidebar */}
          <div className="space-y-6">
            {featureSections.map((section, index) => (
              <Card key={section.title} className="p-6 glass-card animate-fade-in" style={{
                animationDelay: `${index * 100}ms`
              }}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                  </div>
                  <p className="text-sm text-slate-400">{section.description}</p>
                  <div className="space-y-3">
                    {section.features.map((feature) => (
                      <div key={feature.name} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                        <div className="mt-1">{feature.icon}</div>
                        <div>
                          <h3 className="font-medium">{feature.name}</h3>
                          <p className="text-sm text-slate-400">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
