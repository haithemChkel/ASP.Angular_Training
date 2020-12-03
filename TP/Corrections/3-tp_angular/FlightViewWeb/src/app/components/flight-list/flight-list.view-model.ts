import { Injectable } from '@angular/core';
import { FlightService, AirportService } from '@app/services';
import { Flight, Airport } from '@flight-view-models/models';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FlightListView { flights: Flight[], airports: Airport[]}
@Injectable()
export class FlightListViewModel {

  vm$: Observable<FlightListView> = combineLatest([
    this.flightService.entityStore(),
    this.airportService.entityStore()
  ]).pipe(map(([flights, airports]) => ({ flights, airports })));


  constructor(
    private readonly flightService: FlightService,
    private readonly airportService: AirportService) { }
}
