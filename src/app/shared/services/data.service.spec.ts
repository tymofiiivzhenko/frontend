import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Item } from '../models/item';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getItems', () => {
    it('повинна повернути масив items', () => {
      const mockItems: Item[] = [
        {
          id: 1,
          title: 'Test Item',
          description: 'Test Description',
          featured: false
        }
      ];

      service.getItems().subscribe(items => {
        expect(items.length).toBe(1);
        expect(items[0].title).toBe('Test Item');
      });

      const req = httpMock.expectOne('/items');
      expect(req.request.method).toBe('GET');
      req.flush(mockItems);
    });
  });

  describe('getItemById', () => {
    it('повинна повернути item за ID', () => {
      const mockItem: Item = {
        id: 1,
        title: 'Test Item',
        description: 'Test Description'
      };

      service.getItemById(1).subscribe(item => {
        expect(item?.id).toBe(1);
        expect(item?.title).toBe('Test Item');
      });

      const req = httpMock.expectOne('/items/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockItem);
    });
  });

  describe('addItem', () => {
    it('повинна додати новий item', () => {
      const newItem: Omit<Item, 'id'> = {
        title: 'New Item',
        description: 'New Description'
      };

      const mockResponse: Item = {
        id: 2,
        ...newItem
      };

      service.addItem(newItem).subscribe(item => {
        expect(item.id).toBe(2);
        expect(item.title).toBe('New Item');
      });

      const req = httpMock.expectOne('/items');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });
});
