import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Airport } from 'src/app/models/airport';
import { Flight } from 'src/app/models/flight';
import { EntityCollectionService } from 'src/app/services/entity-collection.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightListComponent implements OnInit {
  flightEntityName = 'flight';
  airportEntityName = 'airport';
  vm$ = combineLatest([
    this.flightService.entityStore(this.flightEntityName),
    this.airportService.entityStore(this.airportEntityName),
  ]).pipe(map(([flights, airports]) => ({ flights, airports })));

  selectedFlight: Flight;

  constructor(
    private readonly flightService: EntityCollectionService<Flight>,
    private readonly airportService: EntityCollectionService<Airport>,
    private readonly router: Router,
    private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    await combineLatest([
      this.flightService.getAll(this.flightEntityName),
      this.airportService.getAll(this.airportEntityName)
    ]).toPromise();
  }

  onSelectedFlight(flight: Flight): void {
    this.selectedFlight = flight;
    this.router.navigate(['../flight', flight.id], { relativeTo: this.route });
  }

  async onDeleteFlight(flight: Flight): Promise<void> {
    await this.flightService.delete(this.flightEntityName, flight.id).toPromise();
  }

  async refresh(): Promise<void> {
    await this.flightService.getAll(this.flightEntityName).toPromise();
  }
}
