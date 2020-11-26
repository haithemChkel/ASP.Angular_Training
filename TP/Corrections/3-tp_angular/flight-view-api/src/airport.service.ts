import { Injectable, Scope } from '@nestjs/common';
import { FlightService } from './flight.service';
import { Airport } from './models/airport';

@Injectable({ scope: Scope.DEFAULT })
export class AirportService {
  airports: Map<string, Airport>;
  constructor(private readonly flightService: FlightService) {
    this.airports = new Map<string, Airport>(this.buildDb().map(x => [x.airportCode, x]));
  }
  buildDb(): Airport[] {
    const airports = Array.from(this.flightService.flights.values()).map(x=> x.arrivalAirportCode)
    .concat(Array.from(this.flightService.flights.values()).map(x=> x.departureAirportCode)).map(
      airportCode => {
        return {
          airportCode,
          name: Math.random().toString(36).substring(7).toUpperCase(),
          address: Math.random().toString(36).substring(7).toUpperCase(),
          tax: Math.floor(Math.random() * Math.floor(3000))
        };
      }
    );
    return airports;
  }

  findAll(): Airport[] {
    return Array.from(this.airports.values());
  }

  findOne(airportCode: string): Airport {
    return this.airports.get(airportCode);
  }
}
