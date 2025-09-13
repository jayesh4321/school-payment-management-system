export interface Transaction {
  collect_id: string;
  school_id: string;
  gateway: string;
  order_amount: number;
  transaction_amount: number;
  status: 'Success' | 'Pending' | 'Failed' | 'Cancelled';
  custom_order_id: string;
  created_at: string;
  updated_at: string;
  student_name?: string;
  payment_method?: string;
  description?: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  contact_email: string;
  phone: string;
  total_transactions: number;
  total_amount: number;
}

export interface TransactionStats {
  total_transactions: number;
  total_amount: number;
  success_rate: number;
  pending_count: number;
  failed_count: number;
  monthly_growth: number;
  top_schools: Array<{
    school_id: string;
    school_name: string;
    transaction_count: number;
    total_amount: number;
  }>;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  total?: number;
  page?: number;
  limit?: number;
}

export interface FilterParams {
  status?: string[];
  school_ids?: string[];
  date_from?: string;
  date_to?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}