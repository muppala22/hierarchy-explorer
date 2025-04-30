
import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HierarchyViewComponent } from './hierarchy-view/hierarchy-view.component';
import {authGuard} from './guards/auth.guard';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  {
    path: 'search',
    component: SearchComponent,
    canActivate: [authGuard]
  },
  {
    path: 'hierarchy',
    component: HierarchyViewComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'search'
  }
];
