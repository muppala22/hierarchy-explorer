
import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ProductViewComponent } from './product-view/product-view.component';
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
    component: ProductViewComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'search'
  }
];
