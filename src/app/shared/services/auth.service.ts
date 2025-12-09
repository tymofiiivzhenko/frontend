import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User, AuthResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_URL = '/users';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(email: string, password: string, username: string): Observable<User> {
    const newUser: User = {
      email,
      password,
      username,
      id: Date.now()
    };

    return this.http.post<User>(this.USERS_URL, newUser).pipe(
      tap(user => this.handleAuthResponse(user)),
      catchError(error => this.handleError(error))
    );
  }

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.USERS_URL}?email=${email}&password=${password}`).pipe(
      tap(users => {
        if (users && users.length > 0) {
          this.handleAuthResponse(users[0]);
        } else {
          throw new Error('Невірна електронна пошта або пароль');
        }
      }),
      catchError(error => this.handleError(error))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getCurrentUser(): User | null {
    return this.getUserFromStorage();
  }

  private handleAuthResponse(user: User): void {
    const token = `token_${user.id}_${Date.now()}`;
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.isLoggedInSubject.next(true);
    this.currentUserSubject.next(user);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Сталася помилка при аутентифікації';
    
    if (error.status === 404 || error.status === 0) {
      message = 'Невірна електронна пошта або пароль';
    }
    
    console.error('Auth error:', error);
    alert(message);
    return throwError(() => error);
  }
}
