
import { 
  ChartLine, 
  Brain, 
  Wallet, 
  Calendar,
  Users,
  BarChart3,
  TrendingUp,
  Activity,
  Shield,
  Globe,
  MessageSquare,
  BookOpen
} from "lucide-react";

export const featureSectionsData = [
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
