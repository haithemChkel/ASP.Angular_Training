import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, of, Subscription } from 'rxjs';
import { delay, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { Airport } from 'src/app/models/airport';
import { Flight } from 'src/app/models/flight';
import { EntityCollectionService } from 'src/app/services/entity-collection.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit, OnDestroy {

  flightEntityName = 'flight';
  airportEntityName = 'airport';

  departureAirport: Airport;
  arrivalAirport: Airport;

  @Input() flight: Flight;
  private sub: Subscription;

  constructor(private readonly route: ActivatedRoute,
              private readonly flightService: EntityCollectionService<Flight>,
              private readonly airportService: EntityCollectionService<Airport>) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.sub = this.route.params
      .pipe(
        map(params => +params.id),
        switchMap(id => this.flightService.getById(this.flightEntityName, id)),
        mergeMap(f => combineLatest([
          of(f),
          this.airportService.getById(this.airportEntityName, f.departureAirportCode),
          this.airportService.getById(this.airportEntityName, f.arrivalAirportCode)
        ]))
      ).subscribe(([flight, departureAirport, arrivalAirport]) => {
        this.flight = flight;
        this.departureAirport = departureAirport as Airport;
        this.arrivalAirport = arrivalAirport as Airport;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
