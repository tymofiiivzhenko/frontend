import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <p>© {{ year }} My Angular App</p>
    </footer>
  `,
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  year = new Date().getFullYear();
}
