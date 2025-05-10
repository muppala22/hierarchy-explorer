import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product-model.module';

@Injectable({
  providedIn: 'root'
})
export class ProductSharedService {
  private selectedNodeSource = new BehaviorSubject<Product | null>(null);
  selectedNode$ = this.selectedNodeSource.asObservable();

  selectNode(node: Product) {
    this.selectedNodeSource.next(node);
  }
}
