import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityCollectionService } from 'projects/rx-state/src/public-api';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { entities } from 'src/app/entities';
import { Airport } from 'src/app/models/airport';
import { Flight } from 'src/app/models/flight';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightListComponent implements OnInit {

  vm$ = combineLatest([
    this.flightService.entityStore(entities.flight),
    this.airportService.entityStore(entities.airport),
  ]).pipe(map(([flights, airports]) => ({ flights, airports })));

  selectedFlight: Flight;

  constructor(
    private readonly flightService: EntityCollectionService<Flight>,
    private readonly airportService: EntityCollectionService<Airport>,
    private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    await combineLatest([
      this.flightService.getAll(entities.flight),
      this.airportService.getAll(entities.airport)
    ]).toPromise();
  }

  onSelectedFlight(flight: Flight): void {
    this.selectedFlight = flight;
    this.router.navigate(['../flight', flight.id], { relativeTo: this.route });
  }

  async onDeleteFlight(flight: Flight): Promise<void> {
    await this.flightService.delete(entities.flight, flight.id).toPromise();
  }

  async refresh(): Promise<void> {
    await this.flightService.getAll(entities.flight).toPromise();
  }
}
