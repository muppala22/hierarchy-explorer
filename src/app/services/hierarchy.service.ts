import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HierarchyNode } from '../models/hierarchy-model.module';

interface SearchResult {
  path: string[];
  node: HierarchyNode;
}

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {
  private hierarchyData: HierarchyNode = {
    id: 'EP1',
    label: 'Electronics Platform',
    type: 'Platform',
    expanded: true,
    children: [
      {
        id: 'S1',
        label: 'TechGear Store',
        type: 'Seller',
        expanded: true,
        children: [
          {
            id: 'C1',
            label: 'Smartphones',
            type: 'Collection',
            expanded: true,
            children: [
              {
                id: 'I1',
                label: 'iPhone 15 Pro 256GB Titanium',
                type: 'Item'
              },
              {
                id: 'I2',
                label: 'Samsung Galaxy S24 Ultra 512GB',
                type: 'Item'
              }
            ]
          },
          {
            id: 'C2',
            label: 'Laptops',
            type: 'Collection',
            children: [
              {
                id: 'I3',
                label: 'MacBook Pro 16" M3 Max',
                type: 'Item'
              },
              {
                id: 'I4',
                label: 'Dell XPS 15 i9',
                type: 'Item'
              }
            ]
          }
        ]
      },
      {
        id: 'S2',
        label: 'AudioPhile Hub',
        type: 'Seller',
        children: [
          {
            id: 'C3',
            label: 'Headphones',
            type: 'Collection',
            children: [
              {
                id: 'I5',
                label: 'Sony WH-1000XM5',
                type: 'Item'
              },
              {
                id: 'I6',
                label: 'AirPods Pro 2',
                type: 'Item'
              }
            ]
          }
        ]
      }
    ]
  };

  getHierarchyData(): Observable<HierarchyNode> {
    return of(this.hierarchyData);
  }

  searchHierarchy(query: string): Observable<HierarchyNode> {
    const clonedHierarchy = this.cloneHierarchy(this.hierarchyData);
    const searchTerm = query.toLowerCase();

    // Reset all highlights and expand states
    this.resetNodes(clonedHierarchy);

    // Find and mark matching nodes
    this.findAndMarkMatches(clonedHierarchy, searchTerm);

    return of(clonedHierarchy);
  }

  private cloneHierarchy(node: HierarchyNode): HierarchyNode {
    const clone = { ...node };
    if (node.children) {
      clone.children = node.children.map(child => this.cloneHierarchy(child));
    }
    return clone;
  }

  private resetNodes(node: HierarchyNode): void {
    node.expanded = false;
    node.highlighted = false;
    if (node.children) {
      node.children.forEach(child => this.resetNodes(child));
    }
  }

  private findAndMarkMatches(node: HierarchyNode, searchTerm: string): boolean {
    let hasMatch = node.label.toLowerCase().includes(searchTerm);

    if (node.children) {
      const childrenMatch = node.children.map(child =>
        this.findAndMarkMatches(child, searchTerm)
      ).some(match => match);

      hasMatch = hasMatch || childrenMatch;
    }

    if (hasMatch) {
      node.expanded = true;
      if (node.label.toLowerCase().includes(searchTerm)) {
        node.highlighted = true;
      }
    }

    return hasMatch;
  }
}
