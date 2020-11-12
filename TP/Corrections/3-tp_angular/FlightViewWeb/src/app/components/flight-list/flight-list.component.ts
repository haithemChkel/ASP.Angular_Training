import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightListComponent implements OnInit {

  flights$ = new BehaviorSubject<Flight[]>([]);
  selectedFlight: Flight;

  constructor(private readonly flightService: FlightService, private readonly router: Router) { }
  async ngOnInit(): Promise<void> {
    await this.flightService.findAll().pipe(
      tap(x => this.flights$.next(x))
    ).toPromise();
  }

  onSelectedFlight(flight: Flight): void {
    this.selectedFlight = flight;
    this.router.navigate(['/flight', flight.id]);
  }

  async onDeleteFlight(flight: Flight): Promise<void> {
    await this.flightService.delete(flight.id).toPromise();
    this.flights$.next(this.flights$.value.filter(x => x.id !== flight.id));
  }
}
