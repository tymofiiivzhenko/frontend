import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../../shared/models/item';
import { ItemCardComponent } from '../items-list/item-card';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCardComponent],
  templateUrl: './items-list.html',
  imports: [CommonModule, ItemCardComponent],
  template: `
    <section class="items-list">
      <app-item-card
        *ngFor="let it of items; trackBy: trackById"
        [item]="it">
      </app-item-card>
    </section>
  `,
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent {
  query = '';

  items: Item[] = [
    {
      id: 1,
      title: 'Плануйте день у три кроки - навіть малі кроки рахуються',
      description: 'випишіть 3 пріоритети, розбийте їх на маленькі підзадачі, і закінчіть день коротким підсумком',
      imageUrl: 'assets/img/plan.png',
      featured: true,
      level: 'high'
      featured: false,
      level: 'low'
    },
    {
      id: 2,
      title: 'Пийте достатньо води і завжди тримайте пляшку під рукою',
      description: 'починайте ранок зі склянки води й за бажанням додайте скибку лимона чи огірка, якщо хочете додати смаку',
      imageUrl: 'assets/img/water.png',
      featured: false,
      level: 'medium'
      featured: true,
      level: 'high'
    },
    {
      id: 3,
      title: 'Рухайтеся щонайменше 20–30 хвилин на день',
      description: 'коротка прогулянка, розтяжка або зарядка між справами зменшують стрес і підвищують енергію',
      imageUrl: 'assets/img/walk.png',
      featured: true,
      level: 'low'
    }
  ];

  filtered: Item[] = this.items.slice();

  onQueryChange() {
    const q = this.query.trim().toLowerCase();
    this.filtered = !q
      ? this.items.slice()
      : this.items.filter(it =>
          (it.title?.toLowerCase().includes(q)) ||
          (it.description?.toLowerCase().includes(q))
        );
  }

  onSelected(it: Item) {
    console.log('Обрано елемент:', it);
  }

      level: 'high'
    }
  ];

  trackById = (_: number, it: Item) => it.id;
}
