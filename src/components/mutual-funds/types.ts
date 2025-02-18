
export interface MutualFund {
  id: number;
  fund_house: string;
  fund_name: string;
  category: string;
  risk_level: 'Low' | 'Medium' | 'High';
  fund_size: number;
  launch_date: string | null;
  expense_ratio: number | null;
  created_at: string;
}

export interface FundFilters {
  category?: string;
  risk_level?: string;
  fund_house?: string;
  min_fund_size?: number;
  max_fund_size?: number;
}
