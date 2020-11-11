import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, map, single } from 'rxjs/operators';
import { Flight } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flights$: BehaviorSubject<Flight[]>;

  constructor() {
    const keys = Array(100).keys();
    const flights = [...Array.from(keys)].map(
      i => {
        return {
          id: i,
          flightNumber: `AERO${Math.floor(Math.random() * Math.floor(200))}`,
          departureAirportCode: Math.random().toString(36).substring(7).toUpperCase(),
          arrivalAirportCode: Math.random().toString(36).substring(7).toUpperCase(),
          dateAndTimeOfDeparture: new Date(2020, 11, 16, 17, 23, 42, 11),
          dateAndTimeOfArrival: new Date(2020, 11, 17, 5, 23, 42, 11),
          delay: Math.floor(Math.random() * Math.floor(3000)) % 2 === 0,
          price: Math.floor(Math.random() * Math.floor(3000))
        };
      }
    );
    this.flights$ = new BehaviorSubject<Flight[]>(flights.sort((a, b) => b.id - a.id));
  }

  addFlight(flight: Flight): void {
    if (!flight.id) {
      this.flights$.next([{ id: Math.max(...this.flights$.value.map(x => x.id)) + 1, ...flight }, ...this.flights$.value]);
    }
    else {
      this.flights$.next([flight, ...this.flights$.value.filter(x => x.id !== flight.id)].sort((a, b) => b.id - a.id));
    }
  }


  getFlightById(flightId: number): Observable<Flight> {
    return this.flights$.pipe(map(x => x.find(f => f.id = flightId)));
  }
}
