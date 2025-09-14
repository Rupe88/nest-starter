export interface Product {
  product_id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image?: string;
  is_recurring: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductListResponse {
  items: Product[];
}
