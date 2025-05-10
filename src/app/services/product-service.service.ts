import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product-model.module';

// Enhance ProductServiceService with CRUD operations
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private apiUrl = 'http://localhost:8081/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  getProductByID(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  // Add new methods
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
