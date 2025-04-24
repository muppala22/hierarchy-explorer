import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HierarchyViewComponent} from './hierarchy-view/hierarchy-view.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HierarchyViewComponent],
  template: '<app-hierarchy-view></app-hierarchy-view>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hierarchy-explorer';
}
