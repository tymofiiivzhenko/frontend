import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header>
      <h1>{{ title }}</h1>
      <nav>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Головна</a>
        |
        <a routerLink="/about" routerLinkActive="active">Про нас</a>
      </nav>
    </header>
  `,
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  title = 'Корисні поради для повсякденного життя';
}
