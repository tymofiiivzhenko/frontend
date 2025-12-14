import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('повинен створитися', () => {
    expect(component).toBeTruthy();
  });

  it('повинен відображати заголовок', () => {
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading).toBeTruthy();
  });

  it('повинен містити текст про нас', () => {
    const text = fixture.nativeElement.textContent;
    expect(text.length).toBeGreaterThan(0);
    expect(text).toContain('Про нас');
  });
});
