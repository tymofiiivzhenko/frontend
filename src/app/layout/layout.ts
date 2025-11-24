import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header';
import { FooterComponent } from '../shared/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent {}
