import { Component } from '@angular/core';
import { ItemsListComponent } from '../../features/items-list/items-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ItemsListComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {}
