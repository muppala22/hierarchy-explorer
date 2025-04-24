import { Component } from '@angular/core';
import { HierarchyNode } from '../models/hierarchy-model.module';
import { FormsModule } from '@angular/forms';
import {CommonModule, NgForOf} from '@angular/common';
import {HierarchyNodeComponent} from '../hierarchy-node/hierarchy-node.component';

@Component({
  selector: 'app-hierarchy-view',
  standalone: true,
  templateUrl: './hierarchy-view.component.html',
  imports: [
    CommonModule,
    FormsModule,
    NgForOf,
    HierarchyNodeComponent
  ],
  styleUrls: ['./hierarchy-view.component.scss']
})
export class HierarchyViewComponent {
  searchEAN = '';

  hierarchy: HierarchyNode[] = [
    {
      id: '1',
      label: 'Global | BG',
      type: 'G',
      expanded: true,
      children: [
        {
          id: '2',
          label: 'Country: Bulgaria',
          type: 'C',
          expanded: false,
          children: [
            {
              id: '3',
              label: 'Facility: Sofia',
              type: 'F',
              children: [
                {
                  id: '4',
                  label: 'EAN: 1234567890123',
                  type: 'EAN'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  originalHierarchy: HierarchyNode[] = JSON.parse(JSON.stringify(this.hierarchy));

  filteredHierarchy(): HierarchyNode[] {
    if(!this.searchEAN) return this.hierarchy;

    const search = this.searchEAN.toLowerCase();
    return this.hierarchy.filter(node => this.filterRecursive(node, search))

  }

  private filterRecursive(node: HierarchyNode, search:string) : boolean {
    const match = node.label.toLowerCase().includes(search);
  const filteredChildren = node.children?.filter(child => this.filterRecursive(child, search)) ?? [];

    if(filteredChildren.length >0) {
      node.children = filteredChildren;
      return true;
    }
    return match;
  }

  refresh():void {
    this.hierarchy = JSON.parse(JSON.stringify(this.originalHierarchy));
    this.searchEAN = '';
  }

  expandAll(hierarchy: HierarchyNode[]):void {
    this.toggleAll(this.hierarchy, true);
  }
  collapseAll(hierarchy: HierarchyNode[]):void {
    this.toggleAll(this.hierarchy, false);
  }

  toggleAll(nodes: HierarchyNode[], expanded:boolean):void {
    for(const node of this.hierarchy) {
      node.expanded = expanded;
      if(node.children?.length){
        this.toggleAll(node.children, expanded);
      }
    }

  }
}
