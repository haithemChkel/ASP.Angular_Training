import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {

  flights: Flight[];

  selectedFlight: Flight;

  ngOnInit(): void {
    const keys = Array(1000).keys();
    this.flights = [...Array.from(keys)].map(
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
  }

  onSelectedFlight(flight: Flight): void {
    this.selectedFlight = flight;
  }
}
