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
      budget_suggestions: {
        Row: {
          category: string
          created_at: string | null
          id: number
          reasoning: string | null
          suggested_limit: number
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: number
          reasoning?: string | null
          suggested_limit: number
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: number
          reasoning?: string | null
          suggested_limit?: number
          user_id?: string | null
        }
        Relationships: []
      }
      fund_composition: {
        Row: {
          asset_type: string
          created_at: string | null
          date: string
          fund_id: number | null
          id: number
          percentage: number
        }
        Insert: {
          asset_type: string
          created_at?: string | null
          date: string
          fund_id?: number | null
          id?: never
          percentage: number
        }
        Update: {
          asset_type?: string
          created_at?: string | null
          date?: string
          fund_id?: number | null
          id?: never
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
      fund_holdings: {
        Row: {
          created_at: string | null
          date: string
          fund_id: number | null
          id: number
          percentage: number
          sector: string | null
          security_name: string
        }
        Insert: {
          created_at?: string | null
          date: string
          fund_id?: number | null
          id?: never
          percentage: number
          sector?: string | null
          security_name: string
        }
        Update: {
          created_at?: string | null
          date?: string
          fund_id?: number | null
          id?: never
          percentage?: number
          sector?: string | null
          security_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "fund_holdings_fund_id_fkey"
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
          fund_id: number | null
          id: number
          nav: number
        }
        Insert: {
          benchmark_value?: number | null
          created_at?: string | null
          date: string
          fund_id?: number | null
          id?: never
          nav: number
        }
        Update: {
          benchmark_value?: number | null
          created_at?: string | null
          date?: string
          fund_id?: number | null
          id?: never
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
          category: string
          created_at: string | null
          expense_ratio: number | null
          fund_house: string
          fund_name: string
          fund_size: number
          id: number
          launch_date: string | null
          risk_level: string
        }
        Insert: {
          category: string
          created_at?: string | null
          expense_ratio?: number | null
          fund_house: string
          fund_name: string
          fund_size?: number
          id?: never
          launch_date?: string | null
          risk_level: string
        }
        Update: {
          category?: string
          created_at?: string | null
          expense_ratio?: number | null
          fund_house?: string
          fund_name?: string
          fund_size?: number
          id?: never
          launch_date?: string | null
          risk_level?: string
        }
        Relationships: []
      }
      portfolio: {
        Row: {
          average_price: number
          created_at: string | null
          id: number
          quantity: number
          stock_id: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          average_price: number
          created_at?: string | null
          id?: number
          quantity: number
          stock_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          average_price?: number
          created_at?: string | null
          id?: number
          quantity?: number
          stock_id?: number | null
          updated_at?: string | null
          user_id?: string | null
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
          alert_type: string | null
          created_at: string | null
          id: number
          is_triggered: boolean | null
          stock_id: number | null
          target_price: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          alert_type?: string | null
          created_at?: string | null
          id?: number
          is_triggered?: boolean | null
          stock_id?: number | null
          target_price: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          alert_type?: string | null
          created_at?: string | null
          id?: number
          is_triggered?: boolean | null
          stock_id?: number | null
          target_price?: number
          updated_at?: string | null
          user_id?: string | null
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
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      stock_prices: {
        Row: {
          close_price: number
          created_at: string | null
          date: string
          high_price: number
          id: number
          low_price: number
          open_price: number
          previous_close_price: number | null
          stock_id: number | null
          volume: number
        }
        Insert: {
          close_price: number
          created_at?: string | null
          date: string
          high_price: number
          id?: number
          low_price: number
          open_price: number
          previous_close_price?: number | null
          stock_id?: number | null
          volume: number
        }
        Update: {
          close_price?: number
          created_at?: string | null
          date?: string
          high_price?: number
          id?: number
          low_price?: number
          open_price?: number
          previous_close_price?: number | null
          stock_id?: number | null
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
          id: number
          sector: string | null
          symbol: string
        }
        Insert: {
          company_name: string
          created_at?: string | null
          id?: number
          sector?: string | null
          symbol: string
        }
        Update: {
          company_name?: string
          created_at?: string | null
          id?: number
          sector?: string | null
          symbol?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          category: string | null
          date: string | null
          description: string
          id: number
          status: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          amount: number
          category?: string | null
          date?: string | null
          description: string
          id?: number
          status?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          date?: string | null
          description?: string
          id?: number
          status?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_investments: {
        Row: {
          amount: number
          created_at: string | null
          fund_id: number | null
          id: number
          investment_date: string
          investment_type: string
          nav_at_investment: number
          units: number
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          fund_id?: number | null
          id?: never
          investment_date: string
          investment_type: string
          nav_at_investment: number
          units: number
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          fund_id?: number | null
          id?: never
          investment_date?: string
          investment_type?: string
          nav_at_investment?: number
          units?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_investments_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
        ]
      }
      watchlist: {
        Row: {
          created_at: string | null
          id: number
          stock_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          stock_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          stock_id?: number | null
          user_id?: string | null
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
