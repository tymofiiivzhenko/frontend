import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <h1 class="app-title">
        Корисні поради для повсякденного життя
      </h1>
      <nav class="main-nav">
        <a 
          routerLink="/" 
          routerLinkActive="active" 
          [routerLinkActiveOptions]="{exact: true}"
        >
          Головна
        </a>
        <span class="separator">|</span>
        <a 
          routerLink="/about" 
          routerLinkActive="active"
        >
          Про нас
        </a>

        <!-- Посилання для авторизованих користувачів -->
        <ng-container *ngIf="(authService.isLoggedIn$ | async)">
          <span class="separator">|</span>
          <a 
            routerLink="/add-item" 
            routerLinkActive="active"
          >
            + Додати
          </a>
        </ng-container>

        <span class="separator">|</span>

        <!-- Показуємо email та кнопку вихіду, якщо користувач авторизований -->
        <ng-container *ngIf="(authService.isLoggedIn$ | async) as isLoggedIn; else notLoggedIn">
          <span class="user-email">{{ (authService.currentUser$ | async)?.email }}</span>
          <span class="separator">|</span>
          <button 
            class="logout-btn" 
            (click)="onLogout()"
            type="button"
          >
            Вихід
          </button>
        </ng-container>

        <!-- Посилання на логін та реєстрацію для неавторизованих користувачів -->
        <ng-template #notLoggedIn>
          <a 
            routerLink="/login" 
            routerLinkActive="active"
          >
            Вхід
          </a>
          <span class="separator">|</span>
          <a 
            routerLink="/register" 
            routerLinkActive="active"
          >
            Реєстрація
          </a>
        </ng-template>
      </nav>
    </header>
  `,
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
