
export interface MutualFund {
  id: string;
  fund_house: string;
  fund_name: string;
  category: string;
  risk_level: string;
  fund_size: number;
  launch_date: string | null;
  expense_ratio: number | null;
  alpha: number | null;
  beta: number | null;
  sharpe_ratio: number | null;
  standard_deviation: number | null;
  tracking_error: number | null;
  created_at: string;
  fund_performance?: {
    nav: number;
    date: string;
    benchmark_value: number | null;
  }[];
  fund_composition?: {
    asset_type: string;
    percentage: number;
    date: string;
  }[];
  fund_metrics?: {
    returns_1y: number;
    returns_3y: number;
    returns_5y: number;
    risk_score: number;
    volatility: number;
  }[];
}

export interface FundMetrics {
  id: string;
  fund_id: string;
  date: string;
  returns_1y: number;
  returns_3y: number;
  returns_5y: number;
  risk_score: number;
  volatility: number;
}

export interface FundComparison {
  id: string;
  base_fund_id: string;
  compare_fund_id: string;
  correlation: number;
  performance_diff_1y: number;
  risk_diff: number;
}

export interface FundAlert {
  id: string;
  fund_id: string;
  user_id: string;
  alert_type: 'NAV_CHANGE' | 'PERFORMANCE' | 'RISK';
  threshold: number;
  is_triggered: boolean;
}

export interface FundFilters {
  category?: string;
  risk_level?: string;
  fund_house?: string;
  min_fund_size?: number;
  max_fund_size?: number;
  min_returns_1y?: number;
  max_returns_1y?: number;
  min_risk_score?: number;
  max_risk_score?: number;
}
