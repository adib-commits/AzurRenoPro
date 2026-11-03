export interface QuoteRequestCreate {
  service_id: number;
  customer_name: string;
  email: string;
  phone: string;
  work_type: string;
  surface: number | null;
  description: string;
}

export interface QuoteRequest extends QuoteRequestCreate {
  id: number;
  status: string;
  created_at: string;
}
