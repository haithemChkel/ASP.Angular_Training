import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class FlightService {
  flights: Map<number, any>;
  constructor() {
    this.flights = new Map<number, any>(this.buildDb().map(x => [x.id, x]));
  }
  buildDb(): any {
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

  findAll(): any[] {
    return Array.from(this.flights.values()).sort((a, b) => b.id - a.id);
  }

  exist(flightId: number): boolean {
    return this.flights.has(flightId);
  }

  findOne(flightId: number): any {
    return this.flights.get(flightId);
  }

  create(flight: any): number {
    const newId = Math.max(...this.flights.keys()) + 1;
    this.flights.set(newId, { id: newId, ...flight });
    return newId;
  }

  update(flight: any): void {
    this.flights.set(flight.id, flight);
    return flight;
  }

  delete(flightId: number): boolean {
    return this.flights.delete(flightId);
    return true;
  }
}
