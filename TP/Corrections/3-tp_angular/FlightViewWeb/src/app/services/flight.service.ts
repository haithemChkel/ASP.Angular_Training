import { Injectable } from '@angular/core';
import { entities } from '@app/entities';
import { Flight } from '@flight-view-models/models';
import { DataService, EntityCollectionService, StoreService } from '@rx-state/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService extends EntityCollectionService<Flight> {
  constructor(dataService: DataService<Flight>, storeService: StoreService<Flight>) {
    super(entities.flight, dataService, storeService);
  }
}
