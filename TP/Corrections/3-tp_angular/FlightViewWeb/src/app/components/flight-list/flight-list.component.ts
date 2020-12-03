import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventBusService } from '@rx-state/core';
import { Flight } from '@flight-view-models/models';
import { FlightActions } from '@app/actions';
import { FlightEffectsService } from '@app/effects/flight.effects';
import { FlightListView, FlightListViewModel } from './flight-list.view-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FlightListViewModel]
})
export class FlightListComponent implements OnInit {

  vm$: Observable<FlightListView> = this.vm.vm$;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly eventBusService: EventBusService,
    public readonly flightEffectsService: FlightEffectsService,
    private readonly vm: FlightListViewModel
  ) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.eventBusService.emit({ name: FlightActions.getFlights });
    }, 1);
  }

  onSelectedFlight(flight: Flight): void {
    this.router.navigate(['../flight', flight.id], { relativeTo: this.route });
  }

  onDeleteFlight(flight: Flight): void {
    this.eventBusService.emit<number>({ name: FlightActions.deleteFlight, value: flight.id });
  }

  refresh(): void {
    this.eventBusService.emit<unknown>({ name: FlightActions.getFlights });
  }
}
