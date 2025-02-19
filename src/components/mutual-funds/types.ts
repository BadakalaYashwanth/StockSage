export interface MutualFund {
  id: number;
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
  id: number;
  fund_id: number;
  date: string;
  returns_1y: number;
  returns_3y: number;
  returns_5y: number;
  risk_score: number;
  volatility: number;
}

export interface FundComparison {
  id: number;
  base_fund_id: number;
  compare_fund_id: number;
  correlation: number;
  performance_diff_1y: number;
  risk_diff: number;
}

export interface FundAlert {
  id: number;
  fund_id: number;
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
