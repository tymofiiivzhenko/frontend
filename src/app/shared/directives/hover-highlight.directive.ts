import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]',
  standalone: true
})
export class HoverHighlightDirective {
  @Input('appHoverHighlight') hoverColor: string = '#f0f8ff';
  @Input() appHoverHighlightBorder: string = '1px solid #007bff';

  private originalBackground: string | null = null;
  private originalBorder: string | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    const style = window.getComputedStyle(this.el.nativeElement);
    this.originalBackground = style.backgroundColor;
    this.originalBorder = style.border;

    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.hoverColor);
    this.renderer.setStyle(this.el.nativeElement, 'border', this.appHoverHighlightBorder);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.2s ease-in-out');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.originalBackground !== null) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', this.originalBackground);
    }
    if (this.originalBorder !== null) {
      this.renderer.setStyle(this.el.nativeElement, 'border', this.originalBorder);
    }
  }
}
