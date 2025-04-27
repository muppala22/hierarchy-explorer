
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HierarchyNode } from '../models/hierarchy-model.module';

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

  searchHierarchy(query: string): Observable<HierarchyNode[]> {
    const results: HierarchyNode[] = [];
    this.searchNode(this.hierarchyData, query.toLowerCase(), results);
    return of(results);
  }

  private searchNode(node: HierarchyNode, query: string, results: HierarchyNode[]): void {
    // Check if current node matches
    if (node.label.toLowerCase().includes(query)) {
      // Clone the node to avoid modifying the original
      const matchedNode = { ...node };
      matchedNode.expanded = true;
      results.push(matchedNode);
      return; // Stop here to avoid duplicate results
    }

    // If no match found and node has children, search them
    if (node.children) {
      node.children.forEach(child => {
        this.searchNode(child, query, results);
      });
    }
  }
}
