export interface HierarchyNode {
  id: string;
  label: string;
  type: 'Platform' | 'Seller' | 'Collection' | 'Item';
  children?: HierarchyNode[];
  expanded?: boolean;
}
