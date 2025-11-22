import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

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
export class ItemsListComponent implements OnInit, OnDestroy {
  query = '';
  items: Item[] = [];
  filtered: Item[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly data: DataService) {}

  ngOnInit(): void {
    this.data.getItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => {
        this.items = list;
        this.filtered = list;
      });

  }

  onQueryChange(): void {
    this.data.applyFilter(this.query);
  }

  onSelected(it: Item): void {
    console.log('Обрано елемент:', it);
  }

  trackById = (_: number, it: Item) => it.id;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
