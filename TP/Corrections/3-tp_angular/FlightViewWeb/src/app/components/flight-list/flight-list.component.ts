import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightListComponent implements OnInit {

  flights$: Observable<Flight[]>;

  selectedFlight: Flight;

  constructor(private readonly flightService: FlightService) { }
  ngOnInit(): void {
    this.flights$ = this.flightService.flights$;
  }

  onSelectedFlight(flight: Flight): void {
    this.selectedFlight = flight;
  }
}
