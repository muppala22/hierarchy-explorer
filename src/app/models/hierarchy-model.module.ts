export interface HierarchyNode {
  id: string;
  label: string;
  type: string;
  expanded?: boolean;
  highlighted?: boolean;  // Add this property
  children?: HierarchyNode[];
}
