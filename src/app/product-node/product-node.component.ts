import { Component, Input } from '@angular/core';
import { Product } from '../models/product-model.module';
import { CommonModule } from '@angular/common';
import { ProductSharedService } from '../services/product-shared.service';

@Component({
  selector: 'app-product-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-node.component.html',
  styleUrls: ['./product-node.component.scss']
})
export class ProductNodeComponent {
  @Input() node!: Product;
  @Input() isSearchResult: boolean = false;

  constructor(private sharedService: ProductSharedService) {}

  toggle() {
    if (this.hasChildren) {
      this.node.expanded = !this.node.expanded;
    }
  }

  get hasChildren(): boolean {
    return this.node.children !== undefined && this.node.children.length > 0;
  }

  selectNode(node: Product) {
    this.sharedService.selectNode(node);
  }
}
