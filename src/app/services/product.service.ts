import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product-model.module';

interface SearchResult {
  path: string[];
  node: Product;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productData: Product = {
    id: 'EP1',
    name: 'Electronics Platform',
    description: 'Platform',
    expanded: true,
    children: [
      {
        id: 'S1',
        name: 'TechGear Store',
        description: 'Seller',
        expanded: true,
        children: [
          {
            id: 'C1',
            name: 'Smartphones',
            description: 'Collection',
            expanded: true,
            children: [
              {
                id: 'I1',
                name: 'iPhone 15 Pro 256GB Titanium',
                description: 'Item',
                price: 0,
                imageUrl: '',
                type: ''
              },
              {
                id: 'I2',
                name: 'Samsung Galaxy S24 Ultra 512GB',
                description: 'Item',
                price: 0,
                imageUrl: '',
                type: ''
              }
            ],
            price: 0,
            imageUrl: '',
            type: ''
          },
          {
            id: 'C2',
            name: 'Laptops',
            description: 'Collection',
            children: [
              {
                id: 'I3',
                name: 'MacBook Pro 16" M3 Max',
                description: 'Item',
                price: 0,
                imageUrl: '',
                type: ''
              },
              {
                id: 'I4',
                name: 'Dell XPS 15 i9',
                description: 'Item',
                price: 0,
                imageUrl: '',
                type: ''
              }
            ],
            price: 0,
            imageUrl: '',
            type: ''
          }
        ],
        price: 0,
        imageUrl: '',
        type: ''
      },
      {
        id: 'S2',
        name: 'AudioPhile Hub',
        description: 'Seller',
        children: [
          {
            id: 'C3',
            name: 'Headphones',
            description: 'Collection',
            children: [
              {
                id: 'I5',
                name: 'Sony WH-1000XM5',
                description: 'Item',
                price: 0,
                imageUrl: '',
                type: ''
              },
              {
                id: 'I6',
                name: 'AirPods Pro 2',
                description: 'Item',
                price: 0,
                imageUrl: '',
                type: ''
              }
            ],
            price: 0,
            imageUrl: '',
            type: ''
          }
        ],
        price: 0,
        imageUrl: '',
        type: ''
      }
    ],
    price: 0,
    imageUrl: '',
    type: ''
  };

  getHierarchyData(): Observable<Product> {
    return of(this.productData);
  }

  searchHierarchy(query: string): Observable<Product> {
    const clonedHierarchy = this.cloneHierarchy(this.productData);
    const searchTerm = query.toLowerCase().trim();

    // Reset all nodes
    this.resetNodes(clonedHierarchy);

    // Find and mark matches
    this.findAndMarkMatches(clonedHierarchy, searchTerm);

    // Ensure root is expanded if there are any matches
    if (this.hasHighlightedDescendants(clonedHierarchy)) {
        clonedHierarchy.expanded = true;
    }

    return of(clonedHierarchy);
  }

  private cloneHierarchy(node: Product): Product {
    const clone = { ...node };
    if (node.children) {
      clone.children = node.children.map(child => this.cloneHierarchy(child));
    }
    return clone;
  }

  private resetNodes(node: Product): void {
    node.expanded = false;
    node.highlighted = false;
    if (node.children) {
      node.children.forEach(child => this.resetNodes(child));
    }
  }

  private findAndMarkMatches(node: Product, searchTerm: string): boolean {
    // Check if current node matches
    const nodeMatches = node.name.toLowerCase().includes(searchTerm) ||
                       node.description.toLowerCase().includes(searchTerm);

    let hasMatchingChildren = false;

    // Check children if they exist
    if (node.children && node.children.length > 0) {
        // Recursively check all children
        hasMatchingChildren = node.children.some(child =>
            this.findAndMarkMatches(child, searchTerm)
        );
    }

    // If this node matches or has matching children
    if (nodeMatches || hasMatchingChildren) {
        // Always expand nodes in the path to a match
        node.expanded = true;

        // Only highlight if this specific node matches
        if (nodeMatches) {
            node.highlighted = true;
        }

        return true;
    }

    return false;
}

private hasHighlightedDescendants(node: Product): boolean {
    if (node.highlighted) {
        return true;
    }

    if (node.children) {
        return node.children.some(child => this.hasHighlightedDescendants(child));
    }

    return false;
}
}
