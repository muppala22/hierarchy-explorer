import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSharedService {

  private selectedNodeSource = new BehaviorSubject<any>(null);
  selectedNode$ = this.selectedNodeSource.asObservable();

  selectNode(node: any) {
    this.selectedNodeSource.next(node);
  }
}
