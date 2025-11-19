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
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent {
  query = '';

  items: Item[] = [
    {
      id: 1,
      title: 'Плануйте день у три кроки - навіть малі кроки рахуються',
      description: 'випишіть 3 пріоритети, розбийте їх на маленькі підзадачі, і закінчіть день коротким підсумком',
      imageUrl: 'assets/img/plan.jpg',
      featured: true,
      level: 'high'
    },
    {
      id: 2,
      title: 'Пийте достатньо води і завжди тримайте пляшку під рукою',
      description: 'починайте ранок зі склянки води й за бажанням додайте скибку лимона чи огірка, якщо хочете додати смаку',
      imageUrl: 'assets/img/water.jpg',
      featured: false,
      level: 'medium'
    },
    {
      id: 3,
      title: 'Рухайтеся щонайменше 20–30 хвилин на день',
      description: 'навіть коротка прогулянка, розтяжка або зарядка між справами зменшують стрес і підвищують енергію',
      imageUrl: 'assets/img/walk.jpg',
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

  trackById = (_: number, it: Item) => it.id;
}
