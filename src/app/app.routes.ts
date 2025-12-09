import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { ItemDetailsComponent } from './features/item-details/item-details';
import { ItemFormComponent } from './pages/item-form/item-form';
import { LoginComponent } from './pages/auth/login';
import { RegisterComponent } from './pages/auth/register';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'items/:id', component: ItemDetailsComponent },
      {
        path: 'add-item',
        component: ItemFormComponent,
        canActivate: [authGuard]
      },
      {
        path: 'edit-item/:id',
        component: ItemFormComponent,
        canActivate: [authGuard]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
