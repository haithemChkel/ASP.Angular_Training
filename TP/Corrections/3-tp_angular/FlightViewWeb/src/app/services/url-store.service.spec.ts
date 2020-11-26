import { TestBed } from '@angular/core/testing';

import { EntityRessourcesService } from './entity-ressources.service';

describe('UrlStoreService', () => {
  let service: EntityRessourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityRessourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
