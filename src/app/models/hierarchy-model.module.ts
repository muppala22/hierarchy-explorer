export interface HierarchyNode {
  id: string;
  label: string;
  type: 'G' | 'C' | 'F' | 'EAN';
  children?: HierarchyNode[];
  expanded?: boolean;
}
