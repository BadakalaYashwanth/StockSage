export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      fund_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          fund_id: string
          id: string
          is_triggered: boolean | null
          threshold: number
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          fund_id: string
          id?: string
          is_triggered?: boolean | null
          threshold: number
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          fund_id?: string
          id?: string
          is_triggered?: boolean | null
          threshold?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fund_alerts_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
        ]
      }
      fund_composition: {
        Row: {
          asset_type: string
          created_at: string | null
          date: string
          fund_id: string
          id: string
          percentage: number
        }
        Insert: {
          asset_type: string
          created_at?: string | null
          date: string
          fund_id: string
          id?: string
          percentage: number
        }
        Update: {
          asset_type?: string
          created_at?: string | null
          date?: string
          fund_id?: string
          id?: string
          percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "fund_composition_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
        ]
      }
      fund_metrics: {
        Row: {
          created_at: string | null
          date: string
          fund_id: string
          id: string
          returns_1y: number
          returns_3y: number
          returns_5y: number
          risk_score: number
          volatility: number
        }
        Insert: {
          created_at?: string | null
          date: string
          fund_id: string
          id?: string
          returns_1y: number
          returns_3y: number
          returns_5y: number
          risk_score: number
          volatility: number
        }
        Update: {
          created_at?: string | null
          date?: string
          fund_id?: string
          id?: string
          returns_1y?: number
          returns_3y?: number
          returns_5y?: number
          risk_score?: number
          volatility?: number
        }
        Relationships: [
          {
            foreignKeyName: "fund_metrics_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
        ]
      }
      fund_performance: {
        Row: {
          benchmark_value: number | null
          created_at: string | null
          date: string
          fund_id: string
          id: string
          nav: number
        }
        Insert: {
          benchmark_value?: number | null
          created_at?: string | null
          date: string
          fund_id: string
          id?: string
          nav: number
        }
        Update: {
          benchmark_value?: number | null
          created_at?: string | null
          date?: string
          fund_id?: string
          id?: string
          nav?: number
        }
        Relationships: [
          {
            foreignKeyName: "fund_performance_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
        ]
      }
      mutual_funds: {
        Row: {
          alpha: number | null
          beta: number | null
          category: string
          created_at: string | null
          expense_ratio: number | null
          fund_house: string
          fund_name: string
          fund_size: number
          id: string
          launch_date: string | null
          risk_level: string
          sharpe_ratio: number | null
          standard_deviation: number | null
          tracking_error: number | null
        }
        Insert: {
          alpha?: number | null
          beta?: number | null
          category: string
          created_at?: string | null
          expense_ratio?: number | null
          fund_house: string
          fund_name: string
          fund_size: number
          id?: string
          launch_date?: string | null
          risk_level: string
          sharpe_ratio?: number | null
          standard_deviation?: number | null
          tracking_error?: number | null
        }
        Update: {
          alpha?: number | null
          beta?: number | null
          category?: string
          created_at?: string | null
          expense_ratio?: number | null
          fund_house?: string
          fund_name?: string
          fund_size?: number
          id?: string
          launch_date?: string | null
          risk_level?: string
          sharpe_ratio?: number | null
          standard_deviation?: number | null
          tracking_error?: number | null
        }
        Relationships: []
      }
      portfolio: {
        Row: {
          average_price: number
          created_at: string | null
          id: string
          quantity: number
          stock_id: string
          user_id: string
        }
        Insert: {
          average_price: number
          created_at?: string | null
          id?: string
          quantity: number
          stock_id: string
          user_id: string
        }
        Update: {
          average_price?: number
          created_at?: string | null
          id?: string
          quantity?: number
          stock_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_stock_id_fkey"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          },
        ]
      }
      price_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          id: string
          stock_id: string
          target_price: number
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          id?: string
          stock_id: string
          target_price: number
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          id?: string
          stock_id?: string
          target_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_alerts_stock_id_fkey"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_prices: {
        Row: {
          close_price: number
          created_at: string | null
          date: string
          high_price: number
          id: string
          low_price: number
          open_price: number
          previous_close_price: number | null
          stock_id: string
          volume: number
        }
        Insert: {
          close_price: number
          created_at?: string | null
          date: string
          high_price: number
          id?: string
          low_price: number
          open_price: number
          previous_close_price?: number | null
          stock_id: string
          volume: number
        }
        Update: {
          close_price?: number
          created_at?: string | null
          date?: string
          high_price?: number
          id?: string
          low_price?: number
          open_price?: number
          previous_close_price?: number | null
          stock_id?: string
          volume?: number
        }
        Relationships: [
          {
            foreignKeyName: "stock_prices_stock_id_fkey"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          },
        ]
      }
      stocks: {
        Row: {
          company_name: string
          created_at: string | null
          id: string
          industry: string | null
          sector: string | null
          symbol: string
        }
        Insert: {
          company_name: string
          created_at?: string | null
          id?: string
          industry?: string | null
          sector?: string | null
          symbol: string
        }
        Update: {
          company_name?: string
          created_at?: string | null
          id?: string
          industry?: string | null
          sector?: string | null
          symbol?: string
        }
        Relationships: []
      }
      watchlist: {
        Row: {
          created_at: string | null
          id: string
          stock_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          stock_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          stock_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_stock_id_fkey"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
