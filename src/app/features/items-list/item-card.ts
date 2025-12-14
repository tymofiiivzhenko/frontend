import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import type { Item } from '../../shared/models/item';
import { TruncateDescriptionPipe } from '../../shared/pipes/truncate-description.pipe';
import { HoverHighlightDirective } from '../../shared/directives/hover-highlight.directive';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TruncateDescriptionPipe, HoverHighlightDirective],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input() item!: Item;
  @Output() selected = new EventEmitter<Item>();

  select(): void {
    this.selected.emit(this.item);
  }

  trackByProp = (prop: string) => (item: Item) => item[prop as keyof Item];
}
