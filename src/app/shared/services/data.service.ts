import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError
} from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly itemsUrl = '/items';

  private itemsSubject = new BehaviorSubject<Item[]>([]);
  readonly items$: Observable<Item[]> = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl).pipe(
      tap(items => this.itemsSubject.next(items)),
      catchError(this.handleError.bind(this))
    );
  }

  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.itemsUrl}/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  addItem(itemData: Omit<Item, 'id'>): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, itemData).pipe(
      tap(newItem => {
        const current = this.itemsSubject.value;
        this.itemsSubject.next([...current, newItem]);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  updateItem(id: number, itemData: Omit<Item, 'id'>): Observable<Item> {
    return this.http.put<Item>(`${this.itemsUrl}/${id}`, itemData).pipe(
      tap(updatedItem => {
        const current = this.itemsSubject.value;
        const next = current.map(item => (item.id === id ? updatedItem : item));
        this.itemsSubject.next(next);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.itemsUrl}/${id}`).pipe(
      tap(() => {
        const current = this.itemsSubject.value;
        this.itemsSubject.next(current.filter(item => item.id !== id));
      }),
      catchError(this.handleError.bind(this))
    );
  }

  searchItems(query: string): Observable<Item[]> {
    const q = query.toLowerCase();
    return this.items$.pipe(
      map(items =>
        items.filter(
          item =>
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
        )
      )
    );
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Сталася помилка. Спробуйте пізніше.';

    if (error.status === 0) {
      message = 'Немає зʼєднання з сервером. Перевірте, чи запущений сервер і підключення до мережі.';
    }

    else if (error.status >= 400 && error.status < 500) {
      if (error.status === 400) {
        message = 'Невірні дані запиту (400). Перевірте заповнені поля.';
      } else if (error.status === 404) {
        message = 'Запитаний ресурс не знайдено (404). Можливо, елемент було видалено або id некоректний.';
      } else if (error.status === 401 || error.status === 403) {
        message = 'Недостатньо прав для виконання операції (помилка доступу).';
      } else {
        message = `Сталася помилка на стороні клієнта (${error.status}). Перевірте коректність запиту.`;
      }
    }

    else if (error.status >= 500) {
      message = 'Помилка на сервері. Спробуйте пізніше або зверніться до адміністратора.';
    }

    alert(message);
    return throwError(() => error);
  }
}
