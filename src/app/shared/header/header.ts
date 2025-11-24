import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="header">
      <h1 class="app-title">
        Корисні поради для повсякденного життя
      </h1>
      <nav class="main-nav">
        <a routerLink="/items" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Головна</a>
        |
        <a routerLink="/about" routerLinkActive="active">Про нас</a>
      </nav>
    </header>
  `,
  styleUrls: ['./header.css']
})
export class HeaderComponent {}
