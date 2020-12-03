import { Injectable } from '@angular/core';
import { entities } from '@app/entities';
import { Airport, Flight } from '@flight-view-models/models';
import { DataService, EntityCollectionService, StoreService } from '@rx-state/core';

@Injectable({
  providedIn: 'root'
})
export class AirportService extends EntityCollectionService<Airport> {
  constructor(dataService: DataService<Airport>, storeService: StoreService<Airport>) {
    super(entities.airport, dataService, storeService);
  }
}
