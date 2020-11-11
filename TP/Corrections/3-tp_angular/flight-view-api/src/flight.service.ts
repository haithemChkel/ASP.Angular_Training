import { Injectable, Scope } from '@nestjs/common';
import { Flight } from './models';

@Injectable({ scope: Scope.DEFAULT })
export class FlightService {
  flights: Map<number, Flight>;
  constructor() {
    this.flights = new Map<number, Flight>(this.buildDb().map(x => [x.id, x]));
  }
  buildDb(): Flight[] {
    console.log('buildDb....');
    const keys = Array(100).keys();
    const flights = [...Array.from(keys)].map(
      i => {
        return {
          id: i,
          flightNumber: `A${Math.floor(Math.random() * Math.floor(200))}`,
          departureAirportCode: Math.random().toString(36).substring(7).toUpperCase(),
          arrivalAirportCode: Math.random().toString(36).substring(7).toUpperCase(),
          dateAndTimeOfDeparture: new Date(2020, 11, 16, 17, 23, 42, 11),
          dateAndTimeOfArrival: new Date(2020, 11, 17, 5, 23, 42, 11),
          delay: Math.floor(Math.random() * Math.floor(3000)) % 2 === 0,
          price: Math.floor(Math.random() * Math.floor(3000))
        };
      }
    );
    return flights;
  }

  findAll(): Flight[] {
    return Array.from(this.flights.values()).sort((a, b) => b.id - a.id);
  }

  exist(flightId: number): boolean {
    return this.flights.has(flightId);
  }

  findOne(flightId: number): Flight {
    return this.flights.get(flightId);
  }

  create(flight: Flight): number {
    const newId = Math.max(...this.flights.keys()) + 1;
    this.flights.set(newId, { id: newId, ...flight });
    return newId;
  }

  update(flight: Flight): Flight {
    this.flights.set(flight.id, flight);
    return flight;
  }

  delete(flightId: number): boolean {
    return this.flights.delete(flightId);
    return true;
  }
}
