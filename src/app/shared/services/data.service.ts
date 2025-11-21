import { Injectable } from '@angular/core';
import { Item } from '../../shared/models/item';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly items: Item[] = [
    {
      id: 1,
      title: 'Плануйте день у три кроки - навіть малі кроки рахуються',
      description: 'випишіть 3 пріоритети, розбийте їх на маленькі підзадачі, і закінчіть день коротким підсумком',
      imageUrl: 'assets/img/plan.png',
      featured: true,
      level: 'high'
    },
    {
      id: 2,
      title: 'Пийте достатньо води і завжди тримайте пляшку під рукою',
      description: 'починайте ранок зі склянки води й за бажанням додайте скибку лимона чи огірка, якщо хочете додати смаку',
      imageUrl: 'assets/img/water.png',
      featured: false,
      level: 'medium'
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

  getItems(): Item[] {
    return this.items.slice();
  }
}
