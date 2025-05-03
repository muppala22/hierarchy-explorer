import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../services/product-service.service';
import {ProductSharedService} from '../services/product-shared.service';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  //products: any[] = [];
  selectedNode: any;
  constructor(private productService: ProductServiceService,
              private sharedService: ProductSharedService) { }
  ngOnInit() {
   /* this.productService.getProducts().subscribe(data => {
      this.products = data;
    });*/

    this.sharedService.selectedNode$.subscribe(node => {
      this.selectedNode = node;
    })
  }

}
