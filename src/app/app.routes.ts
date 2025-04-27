
import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HierarchyViewComponent } from './hierarchy-view/hierarchy-view.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search'
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'hierarchy',
    component: HierarchyViewComponent
  },
  {
    path: '**',
    redirectTo: 'search'
  }
];
