export interface PaymentRequestsResponse {
  status: boolean;
  message: string;
  data: PaymentRequest[];
  meta: Meta;
}

export interface PaymentRequest {
  id: number;
  domain: string;
  amount: number;
  currency: string;
  due_date: string; // ISO date string
  has_invoice: boolean;
  invoice_number: number;
  description: string;
  pdf_url: string | null;
  line_items: LineItem[];
  tax: Tax[];
  request_code: string;
  status: string;
  paid: boolean;
  paid_at: string | null;
  metadata: null; // could be refined if structure is known
  notifications: null[]; // no structure provided
  offline_reference: string;
  customer: Customer;
  created_at: string; // ISO date string
}

export interface LineItem {
  name: string;
  amount: number;
}

export interface Tax {
  name: string;
  amount: number;
}

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  phone: string | null;
  metadata: CustomerMetadata | null;
  risk_action: string;
  international_format_phone: string | null;
}

export interface CustomerMetadata {
  calling_code: string;
}

export interface Meta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}
