import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product-model.module';
import { CommonModule } from '@angular/common';
import { ProductNodeComponent } from '../product-node/product-node.component';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, ProductNodeComponent],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})


// product-view.component.ts
export class ProductViewComponent implements OnInit {
  product: Product[] = [];
  searchQuery: string = '';
  isSearchView: boolean = false;  // Add this property
  isSearchResult: boolean = false;
  searchResults: Product[] = [];  // Add this property


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      if (searchQuery) {
        this.searchQuery = searchQuery;
        this.isSearchView = true;
        this.productService.searchHierarchy(searchQuery)
          .subscribe(data => {
            this.product = [data];
            // Keep the full hierarchy but filtered to show only relevant branches
            this.searchResults = this.extractSearchResults([data]).filter(Boolean);
          });
      } else {
        this.searchQuery = '';
        this.isSearchView = false;
        this.productService.getHierarchyData()
          .subscribe(data => {
            this.product = [data];
            this.searchResults = [];
          });
      }
    });
  }

  public expandAll(): void {
    if (this.isSearchView) {
      this.toggleAll(this.searchResults, true);
    } else {
      this.toggleAll(this.product, true);
    }
  }

  public collapseAll(): void {
    if (this.isSearchView) {
      if (this.searchQuery) {
        this.collapseNonHighlighted(this.searchResults);
      } else {
        this.toggleAll(this.searchResults, false);
      }
    } else {
      this.toggleAll(this.product, false);
    }
  }

  public toggleAll(nodes: Product[], expanded: boolean): void {
    nodes.forEach(node => {
      node.expanded = expanded;
      if (node.children?.length) {
        this.toggleAll(node.children, expanded);
      }
    });
  }

  public collapseNonHighlighted(nodes: Product[]): void {
    nodes.forEach(node => {
      // Keep expanded if node is highlighted or has highlighted descendants
      const shouldKeepExpanded = node.highlighted ||
        this.hasHighlightedDescendant(node);

      node.expanded = shouldKeepExpanded;

      if (node.children?.length) {
        this.collapseNonHighlighted(node.children);
      }
    });
  }

  private hasHighlightedDescendant(node: Product): boolean {
    if (!node.children) return false;

    return node.children.some(child =>
      child.highlighted || this.hasHighlightedDescendant(child)
    );
  }

  public goToSearch(): void {
    this.router.navigate(['/search']);
  }

  private extractSearchResults(nodes: Product[]): Product[] {
    const results: Product[] = [];

    for (const node of nodes) {
      // Create a new node with all required properties
      const newNode: Product = {
        id: node.id,
        name: node.name,
        description: node.description,
        price: node.price,
        imageUrl: node.imageUrl,
        type: node.type,
        expanded: node.expanded,
        highlighted: node.highlighted
      };

      if (node.children?.length) {
        const childResults = this.extractSearchResults(node.children);
        if (childResults.length > 0 || node.highlighted) {
          newNode.children = childResults;
          newNode.expanded = true;
          results.push(newNode);
        }
      } else if (node.highlighted) {
        results.push(newNode);
      }
    }

    return results;
  }
}
