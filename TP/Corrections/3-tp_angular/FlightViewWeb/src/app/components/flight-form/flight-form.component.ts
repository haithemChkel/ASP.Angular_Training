import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityCollectionService } from 'projects/rx-state/src/lib/services';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { entities } from 'src/app/entities';
import { Flight } from 'src/app/models';

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
    private readonly flightService: EntityCollectionService<Flight>,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
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
        switchMap(id => Number.isInteger(id) ? this.flightService.getById(entities.flight, id) : of(true)),
        tap(f => {
          if (typeof  f === 'object' && f.hasOwnProperty('flightNumber')) {
            this.flightForm.setValue(f);
          }
        })
      );
  }

  async onSubmit(flight: Flight): Promise<any> {
    if (this.flightForm.valid) {
      if (flight.id !== undefined) {
        await this.flightService.update(entities.flight, { id: flight.id, changes: flight }).toPromise();
      } else {
        await this.flightService.add(entities.flight, flight).toPromise();
      }
      this.router.navigate(['']);
    } else {
      alert(this.flightForm.status + 'form');
    }
  }
}
