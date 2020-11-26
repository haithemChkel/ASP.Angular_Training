import { TestBed } from '@angular/core/testing';

import { EntityCollectionService } from './entity-collection.service';

describe('EntityCollectionService', () => {
  let service: EntityCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
