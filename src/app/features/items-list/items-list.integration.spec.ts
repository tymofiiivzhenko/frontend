import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsListComponent } from './items-list';
import { DataService } from '../../shared/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Item } from '../../shared/models/item';
import { RouterModule } from '@angular/router';

describe('ItemsList + ItemCard Integration', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  let dataService: DataService;

  const mockItems: Item[] = [
    {
      id: 1,
      title: 'Item One',
      description: 'Description One',
      featured: true
    },
    {
      id: 2,
      title: 'Item Two',
      description: 'Description Two',
      featured: false
    },
    {
      id: 3,
      title: 'Item Three',
      description: 'Description Three',
      featured: true
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ItemsListComponent,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
      providers: [DataService]
    }).compileComponents();

    dataService = TestBed.inject(DataService);
    spyOn(dataService, 'getItems').and.returnValue(of(mockItems));

    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('повинен створитися', () => {
    expect(component).toBeTruthy();
  });

  it('повинен мати query property', () => {
    expect(component.query).toBeDefined();
  });
});
