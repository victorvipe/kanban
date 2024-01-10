import { TestBed } from '@angular/core/testing';

import { KanbanApiService } from './kanbanApi.service';

describe('KanbanService', () => {
  let service: KanbanApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KanbanApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
