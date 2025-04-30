import { Component, OnInit } from '@angular/core';
import { HierarchyNode } from '../models/hierarchy-model.module';
import { CommonModule } from '@angular/common';
import { HierarchyNodeComponent } from '../hierarchy-node/hierarchy-node.component';
import { HierarchyService } from '../services/hierarchy.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hierarchy-view',
  standalone: true,
  imports: [CommonModule, HierarchyNodeComponent],
  template: `
    <div class="hierarchy-container">
      <div class="controls">
        <button class="control-btn expand" (click)="expandAll()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span>Expand All</span>
        </button>
        <button class="control-btn collapse" (click)="collapseAll()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14"/>
          </svg>
          <span>Collapse All</span>
        </button>
        <button class="control-btn back" (click)="goToSearch()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back to Search</span>
        </button>
      </div>

      @if (isSearchView) {
        @if (searchResults.length) {
          @for (result of searchResults; track result.id) {
            <app-hierarchy-node [node]="result"></app-hierarchy-node>
          }
        } @else {
          <div class="no-results">No results found</div>
        }
      } @else {
        @for (node of hierarchy; track node.id) {
          <app-hierarchy-node [node]="node"></app-hierarchy-node>
        }
      }
    </div>
  `,
  styles: [`
    .hierarchy-container {
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
    }
/*button*/
    .controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .control-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background-color: white;
      color: #4b5563;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .control-btn:hover {
      background-color: #f8fafc;
      border-color: #cbd5e1;
      color: #1e40af;
    }

    .control-btn.expand {
      border-color: #22c55e;
      color: #15803d;
    }

    .control-btn.expand:hover {
      background-color: #f0fdf4;
      color: #166534;
    }

    .control-btn.collapse {
      border-color: #f97316;
      color: #c2410c;
    }

    .control-btn.collapse:hover {
      background-color: #fff7ed;
      color: #9a3412;
    }

    .control-btn.back {
      margin-left: auto;
      border-color: #6b7280;
    }

    .control-btn svg {
      width: 18px;
      height: 18px;
      stroke-width: 2;
    }

    .no-results {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
      font-size: 1.1rem;
    }
  `]
})

// hierarchy-view.component.ts
export class HierarchyViewComponent implements OnInit {
  hierarchy: HierarchyNode[] = [];
  searchQuery: string = '';
  isSearchView: boolean = false;  // Add this property
  searchResults: HierarchyNode[] = [];  // Add this property


  constructor(
    private route: ActivatedRoute,
    private hierarchyService: HierarchyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      if (searchQuery) {
        this.searchQuery = searchQuery;
        this.isSearchView = true;
        this.hierarchyService.searchHierarchy(searchQuery)
          .subscribe(data => {
            this.hierarchy = [data];
            // Filter out only highlighted nodes and their parents for search results
            this.searchResults = this.extractSearchResults([data]);
          });
      } else {
        this.searchQuery = '';
        this.isSearchView = false;
        this.hierarchyService.getHierarchyData()
          .subscribe(data => {
            this.hierarchy = [data];
            this.searchResults = [];
          });
      }
    });
  }


  expandAll(): void {
    this.toggleAll(this.hierarchy, true);
  }

  collapseAll(): void {
    // Don't collapse nodes with highlighted items when there's a search query
    if (this.searchQuery) {
      this.collapseNonHighlighted(this.hierarchy);
    } else {
      this.toggleAll(this.hierarchy, false);
    }
  }

  private toggleAll(nodes: HierarchyNode[], expanded: boolean): void {
    nodes.forEach(node => {
      node.expanded = expanded;
      if (node.children?.length) {
        this.toggleAll(node.children, expanded);
      }
    });
  }

  private collapseNonHighlighted(nodes: HierarchyNode[]): void {
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

  private hasHighlightedDescendant(node: HierarchyNode): boolean {
    if (!node.children) return false;

    return node.children.some(child =>
      child.highlighted || this.hasHighlightedDescendant(child)
    );
  }
  goToSearch(): void {
    this.router.navigate(['/search']);
  }

  private extractSearchResults(nodes: HierarchyNode[]): HierarchyNode[] {
    let results: HierarchyNode[] = [];

    for (const node of nodes) {
      if (node.highlighted) {
        results.push({ ...node, children: [] }); // Add highlighted nodes without children
      }

      if (node.children?.length) {
        const childResults = this.extractSearchResults(node.children);
        if (childResults.length > 0) {
          // If we found highlighted children, add this node with only the highlighted children
          const nodeCopy = { ...node, children: childResults };
          results.push(nodeCopy);
        }
      }
    }

    return results;
  }


}
