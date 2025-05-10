// Add advanced search options
interface SearchOptions {
  query: string;
  filters: {
    priceRange?: { min: number; max: number };
    category?: string[];
    rating?: number;
    inStock?: boolean;
  };
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
}