import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../services/product-service.service';

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
