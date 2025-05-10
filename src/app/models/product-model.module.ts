export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  type: string;
  expanded?: boolean;
  highlighted?: boolean;  // Add this property
  children?: Product[];
}
