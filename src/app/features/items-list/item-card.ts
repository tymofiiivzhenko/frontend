import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../shared/models/item';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="item-card"
             [ngClass]="{
               'lvl-low': item?.level === 'low',
               'lvl-medium': item?.level === 'medium',
               'lvl-high': item?.level === 'high'
             }"
             [ngStyle]="item?.featured ? { borderColor: '#ff7a00' } : null">

      <img *ngIf="item?.imageUrl" [src]="item!.imageUrl" [alt]="item?.title">

      <div class="item-card__head">
        <h3 class="item-card__title">
          {{ item?.title }}
          <span *ngIf="item?.featured" class="badge">Рекомендовано</span>
        </h3>
      </div>

      <div class="item-card__body">
        <p class="item-card__desc">{{ item?.description }}</p>

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
