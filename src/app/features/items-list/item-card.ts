import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../shared/models/item';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="item-card">
      <img *ngIf="item?.imageUrl" [src]="item!.imageUrl" [alt]="item?.title">
      <div class="item-card__head">
        <h3 class="item-card__title">{{ item?.title }}</h3>
      </div>
      <div class="item-card__body">
        <p class="item-card__desc">{{ item?.description }}</p>
        <p *ngIf="item?.price != null"><strong>{{ item!.price | currency:'USD' }}</strong></p>
        <ul *ngIf="item?.tags?.length">
          <li *ngFor="let t of item!.tags">{{ t }}</li>
        </ul>
      </div>
    </article>
  `,
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input() item!: Item;
}
