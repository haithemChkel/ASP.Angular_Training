import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityCollectionService } from 'projects/rx-state/src/public-api';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { entities } from 'src/app/entities';
import { Airport } from 'src/app/models/airport';
import { Flight } from 'src/app/models/flight';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {


  vm$: Observable<{ flight: Flight, departureAirport: Airport, arrivalAirport: Airport }>;

  constructor(private readonly route: ActivatedRoute,
              private readonly flightService: EntityCollectionService<Flight>,
              private readonly airportService: EntityCollectionService<Airport>,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.vm$ = this.route.params
      .pipe(
        map(params => +params.id),
        switchMap(id => this.flightService.getById(entities.flight, id)),
        mergeMap(f => combineLatest([
          of(f),
          this.airportService.getAll(entities.airport)
        ])),
        map(([flight, airports]) => ({
          flight,
          departureAirport: airports.find(x => x.airportCode === flight.departureAirportCode),
          arrivalAirport: airports.find(x => x.airportCode === flight.arrivalAirportCode)
        })
        )
      );
  }

  onEditFlight(flight: Flight): void {
    this.router.navigate(['../../edit', flight.id], { relativeTo: this.route });
  }
}
