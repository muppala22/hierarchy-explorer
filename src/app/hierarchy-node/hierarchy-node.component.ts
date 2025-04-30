import { Component, Input } from '@angular/core';
import { HierarchyNode } from '../models/hierarchy-model.module';
import {CommonModule, NgClass} from '@angular/common';

// hierarchy-node/hierarchy-node.component.ts
@Component({
  selector: 'app-hierarchy-node',
  template: `
    <div class="node" [ngClass]="{'highlighted': node.highlighted}">
      <div class="node-content">
        <span class="expand-button" (click)="toggle()" [class.invisible]="!hasChildren">
          {{ node.expanded ? '▼' : '▶' }}
        </span>
        <span class="node-label">{{ node.label }}</span>
      </div>
      @if (hasChildren && node.expanded) {
        <div class="children">
          @for (child of node.children; track child.id) {
            <app-hierarchy-node [node]="child"></app-hierarchy-node>
          }
        </div>
      }
    </div>
  `,
  imports: [
    NgClass
  ],
  standalone: true,
  styles: [`
    .node {
      margin: 5px 0;
      padding: 5px;
    }

    .node-content {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .expand-button {
      cursor: pointer;
      user-select: none;
      width: 20px;  /* Add fixed width */
      display: inline-block;  /* Ensure consistent spacing */
    }

    .invisible {
      visibility: hidden;
    }

    .highlighted {
      background-color: #fff3cd;
      border-radius: 4px;
    }

    .children {
      margin-left: 20px;
    }
  `]
})
export class HierarchyNodeComponent {
  @Input() node!: HierarchyNode;

  toggle() {
    this.node.expanded = !this.node.expanded;
  }

  protected get hasChildren(): boolean {
    return this.node.children !== undefined && this.node.children.length > 0;
  }
}
