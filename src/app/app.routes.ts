import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { ItemDetailsComponent } from './features/item-details/item-details';
import { ItemFormComponent } from './pages/item-form/item-form';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'items/:id', component: ItemDetailsComponent },
      { path: 'add-item', component: ItemFormComponent },
      { path: 'edit-item/:id', component: ItemFormComponent }
    ]
  }
];
