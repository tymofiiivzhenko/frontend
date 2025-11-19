import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../shared/models/item';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input() item!: Item;
  @Output() selected = new EventEmitter<Item>();

  select() {
    if (this.item) {
      this.selected.emit(this.item);
    }
  }
}
