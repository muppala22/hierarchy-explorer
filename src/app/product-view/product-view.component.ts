import {finalize, Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {Product} from '../models/product-model.module';
import {LoadingService} from '../services/loading-service.service';
import {ErrorHandlingService} from '../services/ErrorHandling';
import {AsyncPipe, CommonModule, NgForOf, NgIf} from '@angular/common';
@Component({
  selector: 'app-product-view',
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    <div *ngIf="!(loading$ | async) && product.length">
      <div *ngFor="let item of product">
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
        <p>Price: {{ item.price }} {{ item.currency }}</p>
        <p>In Stock: {{ item.inStock }}</p>
        <p>Rating: {{ item.rating }} ({{ item.reviews }} reviews)</p>
      </div>
    </div>
  `
})
export class ProductViewComponent implements OnInit {
  get productService(): any {
    return this._productService;
  }

  set productService(value: any) {
    this._productService = value;
  }
  loading$: Observable<boolean>;
  product: Product[] = [];
  private _productService: any;

  constructor(
    private loadingService: LoadingService,
    private errorHandling: ErrorHandlingService
  ) {
    this.loading$ = this.loadingService.isLoading$;
  }



  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  loadData() {
    this.loadingService.show();
    this._productService.getHierarchyData()
      .pipe(
        finalize(() => this.loadingService.hide())
      )
      .subscribe({
        next: (data: Product) => {
          this.product = [data];
        },
        error: (error: any) => {
          this.errorHandling.handleError(error);
        }
      });
  }
}
