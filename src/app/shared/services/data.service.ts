import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items: Item[] = [
    {
      id: 1,
      title: 'Плануйте день у три кроки - навіть малі кроки рахуються',
      description: 'випишіть 3 пріоритети, розбийте їх на маленькі підзадачі, і закінчіть день короткою підсумком',
      imageUrl: 'assets/img/plan.png',
      featured: false
    },
    {
      id: 2,
      title: 'Пийте достатньо води і завжди тримайте пляшку під рукою',
      description: 'починайте ранок зі склянки води й за бажанням додайте скибку лимона чи огірка, якщо хочете додати смаку',
      imageUrl: 'assets/img/water.png',
      featured: true
    },
    {
      id: 3,
      title: 'Рухайтесь щонайменше 20-30 хвилин на день',
      description: 'коротка прогулянка, розтяжка або зарядка між справами зменшують стрес і підвищують енергію',
      imageUrl: 'assets/img/walk.png',
      featured: true
    }
  ];

  private itemsSubject = new BehaviorSubject<Item[]>(this.items);
  private nextId = 4;

  readonly items$: Observable<Item[]> = this.itemsSubject.asObservable();

  constructor() {}

  getItems(): Observable<Item[]> {
    return this.itemsSubject.asObservable();
  }

  getItemById(id: number): Item | undefined {
    return this.items.find(item => item.id === id);
  }

  addItem(itemData: Omit<Item, 'id'>): void {
    const newItem: Item = {
      id: this.nextId++,
      ...itemData
    };
    this.items = [...this.items, newItem];
    this.itemsSubject.next(this.items);
  }

  updateItem(id: number, itemData: Omit<Item, 'id'>): void {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = { id, ...itemData };
      this.itemsSubject.next([...this.items]);
    }
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.itemsSubject.next(this.items);
  }

  searchItems(query: string): Observable<Item[]> {
    return this.itemsSubject.pipe(
      map(items =>
        items.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }
}
