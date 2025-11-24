import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';
import { ItemsListComponent } from './features/items-list/items-list';
import { ItemDetailsComponent } from './features/item-details/item-details';
import { AboutComponent } from './pages/about/about';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'items', component: ItemsListComponent },
      { path: 'items/:id', component: ItemDetailsComponent },
      { path: 'about', component: AboutComponent },
      { path: '', redirectTo: 'items', pathMatch: 'full' },
      { path: '**', redirectTo: 'items' }
    ]
  }
];
