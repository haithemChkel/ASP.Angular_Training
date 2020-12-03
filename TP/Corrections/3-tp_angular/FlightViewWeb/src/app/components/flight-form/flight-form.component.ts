import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Flight } from '@flight-view-models/models';
import { FlightService } from '@app/services';
import { EventBusService } from '@rx-state/core';
import { FlightActions } from '@app/actions';
import { FlightEffectsService } from '@app/effects/flight.effects';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss']
})
export class FlightFormComponent implements OnInit {
  flightForm: FormGroup;
  vm$: Observable<any>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly flightService: FlightService,
    private readonly route: ActivatedRoute,
    private readonly eventBusService: EventBusService,
    public readonly flightEffectsService: FlightEffectsService
  ) {
    this.flightForm = this.formBuilder.group({
      id: undefined,
      flightNumber: [undefined, Validators.required],
      departureAirportCode: [undefined, Validators.required],
      arrivalAirportCode: [undefined, Validators.required],
      dateAndTimeOfDeparture: [undefined, Validators.required],
      dateAndTimeOfArrival: [undefined, Validators.required],
      delay: false,
      price: [undefined, Validators.required]
    });
  }

  ngOnInit(): void {
    this.vm$ = this.route.params
      .pipe(
        map(params => +params.id),
        switchMap(id => Number.isInteger(id) ? this.flightService.getById(id) : of(true)),
        tap(f => {
          if (typeof f === 'object' && f.hasOwnProperty('flightNumber')) {
            this.flightForm.setValue(f);
          }
        })
      );
  }

  onSubmit(flight: Flight): void {
    if (this.flightForm.valid) {
      this.eventBusService.emit<Flight>({ name: FlightActions.saveFlight, value: flight });
    } else {
      alert(this.flightForm.status + 'form');
    }
  }
}
