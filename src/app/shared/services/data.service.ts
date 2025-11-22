import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../../shared/models/item';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly seed: Item[] = [
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
      level: 'medium'
    }
  ];

  private readonly itemsState$ = new BehaviorSubject<Item[]>(this.seed.slice());

  getItemsOnce(): Observable<Item[]> {
    return of(this.seed.slice());
  }

  getItems(): Observable<Item[]> {
    return this.itemsState$.asObservable();
  }

  applyFilter(query: string): void {
    const q = (query ?? '').trim().toLowerCase();
    const next = !q
      ? this.seed.slice()
      : this.seed.filter(it =>
          (it.title?.toLowerCase().includes(q)) ||
          (it.description?.toLowerCase().includes(q))
        );
    this.itemsState$.next(next);
  }

  filtered$(query$: Observable<string>): Observable<Item[]> {
    return query$.pipe(
      map(q => (q ?? '').trim().toLowerCase()),
      map(q =>
        !q
          ? this.seed.slice()
          : this.seed.filter(it =>
              (it.title?.toLowerCase().includes(q)) ||
              (it.description?.toLowerCase().includes(q))
            )
      )
    );
  }
}
