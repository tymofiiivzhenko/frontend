import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Item } from '../../shared/models/item';
import { ItemCardComponent } from '../items-list/item-card';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCardComponent],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent implements OnInit {
  query = '';
  items: Item[] = [];
  filtered: Item[] = [];

  constructor(private readonly data: DataService) {}

  ngOnInit(): void {
    this.items = this.data.getItems();
    this.filtered = this.items.slice();
  }

  onQueryChange(): void {
    const q = this.query.trim().toLowerCase();
    this.filtered = !q
      ? this.items.slice()
      : this.items.filter(it =>
          (it.title?.toLowerCase().includes(q)) ||
          (it.description?.toLowerCase().includes(q))
        );
  }

  onSelected(it: Item): void {
    console.log('Обрано елемент:', it);
  }

  trackById = (_: number, it: Item) => it.id;
}
