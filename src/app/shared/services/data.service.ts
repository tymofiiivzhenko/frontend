import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Item } from '../../shared/models/item';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly initialItems: Item[] = [
    {
      id: 1,
      title: 'Плануйте день у три кроки - навіть малі кроки рахуються',
      description: 'випишіть 3 пріоритети, розбийте їх на маленькі підзадачі, і закінчіть день коротким підсумком',
      imageUrl: 'assets/img/plan.png',
      featured: false,
      level: 'low'
    },
    {
      id: 2,
      title: 'Пийте достатньо води і завжди тримайте пляшку під рукою',
      description: 'починайте ранок зі склянки води й за бажанням додайте скибку лимона чи огірка, якщо хочете додати смаку',
      imageUrl: 'assets/img/water.png',
      featured: true,
      level: 'high'
    },
    {
      id: 3,
      title: 'Рухайтеся щонайменше 20–30 хвилин на день',
      description: 'коротка прогулянка, розтяжка або зарядка між справами зменшують стрес і підвищують енергію',
      imageUrl: 'assets/img/walk.png',
      featured: true,
      level: 'high'
    }
  ];

  private readonly itemsSubject = new BehaviorSubject<Item[]>(this.initialItems);
  readonly items$: Observable<Item[]> = this.itemsSubject.asObservable();

  constructor() {}

  getItems(): Item[] {
    return this.itemsSubject.getValue().slice();
  }

  getItems$(): Observable<Item[]> {
    return this.items$;
  }

  getItemById(id: number): Item | undefined {
    return this.itemsSubject.getValue().find(it => it.id === id);
  }

  addItem(item: Item): void {
    const current = this.itemsSubject.getValue();
    this.itemsSubject.next([...current, item]);
  }

  updateItem(updated: Item): void {
    const current = this.itemsSubject.getValue();
    const next = current.map(it => (it.id === updated.id ? updated : it));
    this.itemsSubject.next(next);
  }

  removeItem(id: number): void {
    const current = this.itemsSubject.getValue();
    const next = current.filter(it => it.id !== id);
    this.itemsSubject.next(next);
  }
}
