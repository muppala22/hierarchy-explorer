import { Component, Input } from '@angular/core';
import { HierarchyNode } from '../models/hierarchy-model.module';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-hierarchy-node',
  standalone: true,
  templateUrl: './hierarchy-node.component.html',
  imports: [
    CommonModule
  ],
  styleUrls: ['./hierarchy-node.component.scss']
})
export class HierarchyNodeComponent {
  @Input() node!: HierarchyNode;

  toggle() {
    this.node.expanded = !this.node.expanded;
  }
}
