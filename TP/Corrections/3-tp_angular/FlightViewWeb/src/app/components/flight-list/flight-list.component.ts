import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {

  flights: Flight[];

  constructor() { }

  ngOnInit(): void {
    this.flights = [
      {
        id: 1,
        flightNumber: 'XGR1233',
        departureAirportCode: 'ORLYS',
        arrivalAirportCode: 'MRGGH',
        dateAndTimeOfDeparture: new Date(2020, 11, 16, 17, 23, 42, 11),
        dateAndTimeOfArrival: new Date(2020, 11, 17, 5, 23, 42, 11),
        delay: false,
        price: 500
      },
      {
        id: 2,
        flightNumber: 'FRTTF1233',
        departureAirportCode: 'ORLYS',
        arrivalAirportCode: 'CCVFFR',
        dateAndTimeOfDeparture: new Date(2020, 11, 16, 17, 23, 42, 11),
        dateAndTimeOfArrival: new Date(2020, 11, 17, 5, 23, 42, 11),
        delay: true,
        price: 700
      },
      {
        id: 3,
        flightNumber: 'FFGTGCDD',
        departureAirportCode: 'GTYLK',
        arrivalAirportCode: 'XSZEVFD',
        dateAndTimeOfDeparture: new Date(2020, 11, 16, 17, 23, 42, 11),
        dateAndTimeOfArrival: new Date(2020, 11, 17, 5, 23, 42, 11),
        delay: false,
        price: 1200
      },
      {
        id: 3,
        flightNumber: 'XX53268',
        departureAirportCode: 'FGFGHF',
        arrivalAirportCode: 'HFGHDGFH',
        dateAndTimeOfDeparture: new Date(2020, 11, 16, 17, 23, 42, 11),
        dateAndTimeOfArrival: new Date(2020, 11, 17, 5, 23, 42, 11),
        delay: true,
        price: 1200
      },
      {
        id: 3,
        flightNumber: 'FFGTGCDD',
        departureAirportCode: 'GTYLK',
        arrivalAirportCode: 'XSZEVFD',
        dateAndTimeOfDeparture: new Date(2020, 11, 16, 17, 23, 42, 11),
        dateAndTimeOfArrival: new Date(2020, 11, 17, 5, 23, 42, 11),
        delay: false,
        price: 1200
      }
    ];
  }
}
