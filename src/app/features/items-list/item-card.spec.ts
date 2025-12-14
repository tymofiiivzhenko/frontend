import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card';
import { Item } from '../../shared/models/item';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TruncateDescriptionPipe } from '../../shared/pipes/truncate-description.pipe';
import { HoverHighlightDirective } from '../../shared/directives/hover-highlight.directive';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ItemCardComponent,
        CommonModule,
        RouterModule.forRoot([]),
        TruncateDescriptionPipe,
        HoverHighlightDirective
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
  });

  it('повинен створитися', () => {
    expect(component).toBeTruthy();
  });

  it('повинен відображати title', () => {
    const mockItem: Item = {
      id: 1,
      title: 'Test Title',
      description: 'Test Description',
      featured: false
    };

    component.item = mockItem;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Title');
  });

  it('повинен відображати description', () => {
    const mockItem: Item = {
      id: 1,
      title: 'Test Title',
      description: 'Test Description',
      featured: false
    };

    component.item = mockItem;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Description');
  });

  it('повинен показати badge для featured items', () => {
    const mockItem: Item = {
      id: 1,
      title: 'Featured Item',
      description: 'Test Description',
      featured: true
    };

    component.item = mockItem;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Featured');
  });

  it('повинен емітити selected при виборі', () => {
    const mockItem: Item = {
      id: 1,
      title: 'Test Title',
      description: 'Test Description'
    };

    component.item = mockItem;
    spyOn(component.selected, 'emit');

    component.select();

    expect(component.selected.emit).toHaveBeenCalledWith(mockItem);
  });

  it('не повинен показати badge для non-featured items', () => {
    const mockItem: Item = {
      id: 1,
      title: 'Regular Item',
      description: 'Test Description',
      featured: false
    };

    component.item = mockItem;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    const hasFeatured = compiled.textContent.includes('Featured');
    expect(hasFeatured).toBeFalse();
  });
});
