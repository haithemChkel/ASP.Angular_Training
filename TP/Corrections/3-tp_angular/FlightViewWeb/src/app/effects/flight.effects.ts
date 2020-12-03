import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlightActions } from '@app/actions';
import { AirportService, FlightService } from '@app/services';
import { Flight } from '@flight-view-models/models';
import { EventBusService } from '@rx-state/core';
import { combineLatest, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class FlightEffectsService {

  getFlightsEffects$ =
    this.eventBusService.on(FlightActions.getFlights)
      .pipe(
        switchMap(() => combineLatest([
          this.flightService.getAll(),
          this.airportService.getAll()
        ])),
        tap(() => this.eventBusService.emit({ name: FlightActions.getFlightsSucess })),
        catchError(err => {
          this.eventBusService.emit({ name: FlightActions.getFlightsFailure, value: err });
          return of(undefined);
        })
      );

  deleteFlightEffects$ = this.eventBusService.on(FlightActions.deleteFlight)
    .pipe(
      switchMap((id: number) => this.flightService.delete(id)),
      tap(() => this.eventBusService.emit({ name: FlightActions.deleteFlightSucess })),
      catchError(() => {
        this.eventBusService.emit({ name: FlightActions.deleteFlightFailure });
        return of(undefined);
      })
    );

  saveFlightEffects$ = this.eventBusService.on(FlightActions.saveFlight)
    .pipe(
      switchMap((flight: Flight) => {
        if (flight.id !== undefined && flight.id !== null) {
          return this.flightService.update({ id: flight.id, changes: flight });
        } else {
          return this.flightService.add(flight);
        }
      }),
      tap(() => this.eventBusService.emit({ name: FlightActions.saveFlightSucess })),
      catchError(err => {
        this.eventBusService.emit({ name: FlightActions.saveFlightFailure, value: err });
        return of(err);
      })
    );

  saveFlightEffectsSuccess$ = this.eventBusService.on(FlightActions.saveFlightSucess)
    .pipe(
      tap(() => {
        this.router.navigate(['']);
      })
    );

  saveFlightEffectsFailure$ = this.eventBusService.on(FlightActions.saveFlightFailure);

  constructor(
    private readonly flightService: FlightService,
    private readonly airportService: AirportService,
    private readonly eventBusService: EventBusService,
    private readonly router: Router) {
  }
}
