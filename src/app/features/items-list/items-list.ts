import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Item } from '../../shared/models/item';
import { ItemCardComponent } from '../items-list/item-card';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ItemCardComponent],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent implements OnInit {
  query = '';
  items$!: Observable<Item[]>;
  filtered$!: Observable<Item[]>;

  constructor(private readonly data: DataService) {}

  ngOnInit(): void {
    this.data.getItems().subscribe();

    this.items$ = this.data.items$;
    this.filtered$ = this.items$;
  }

  onQueryChange(): void {
    const q = this.query.trim().toLowerCase();

    this.filtered$ = this.items$.pipe(
      map(items =>
        !q
          ? items
          : items.filter(it =>
              (it.title?.toLowerCase().includes(q)) ||
              (it.description?.toLowerCase().includes(q))
            )
      )
    );
  }

  trackById = (_: number, it: Item) => it.id;
}
