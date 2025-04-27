import { Component, OnInit } from '@angular/core';
import { HierarchyNode } from '../models/hierarchy-model.module';
import { CommonModule } from '@angular/common';
import { HierarchyNodeComponent } from '../hierarchy-node/hierarchy-node.component';
import { HierarchyService } from '../services/hierarchy.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hierarchy-view',
  standalone: true,
  templateUrl: './hierarchy-view.component.html',
  imports: [
    CommonModule,
    HierarchyNodeComponent
  ],
  styleUrls: ['./hierarchy-view.component.scss']
})
export class HierarchyViewComponent implements OnInit {
  hierarchy: HierarchyNode[] = [];
  searchResults: HierarchyNode[] = [];
  isSearchView = false;

  constructor(
    private hierarchyService: HierarchyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      if (searchQuery) {
        this.isSearchView = true;
        this.hierarchyService.searchHierarchy(searchQuery)
          .subscribe(results => {
            this.searchResults = results;
          });
      } else {
        this.isSearchView = false;
        this.hierarchyService.getHierarchyData()
          .subscribe(data => {
            this.hierarchy = [data];
          });
      }
    });
  }

  expandAll(): void {
    this.toggleAll(this.isSearchView ? this.searchResults : this.hierarchy, true);
  }

  collapseAll(): void {
    this.toggleAll(this.isSearchView ? this.searchResults : this.hierarchy, false);
  }

  goToSearch(): void {
    this.router.navigate(['/search']);
  }

  private toggleAll(nodes: HierarchyNode[], expanded: boolean): void {
    nodes.forEach(node => {
      node.expanded = expanded;
      if (node.children?.length) {
        this.toggleAll(node.children, expanded);
      }
    });
  }
}
