import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataService } from '../../shared/services/data.service';
import { Item } from '../../shared/models/item';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-details.html',
  styleUrls: ['./item-details.css']
})
export class ItemDetailsComponent implements OnInit {
  item: Item | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly data: DataService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.data.getItemById(id);
  }
}
