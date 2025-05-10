import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../services/product-service.service';
import { ScrollingModule } from '@angular/cdk/scrolling';

export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe((products: Product[]) => this.products = products);
  }
}

@Component({
  imports: [ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
      <div *cdkVirtualFor="let product of products" class="product-item">
        <!-- Product content -->
      </div>
    </cdk-virtual-scroll-viewport>
  `
})
export class ProductScrollComponent {
  products: Product[] = [];

  constructor(private productService: ProductServiceService) {
    this.productService.getProducts()
      .subscribe((products: Product[]) => this.products = products);
  }
}
