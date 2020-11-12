import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Flight } from 'src/app/models';
import { FlightService } from 'src/app/services';

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
        switchMap(id => Number.isInteger(id) ? this.flightService.findOne(id) : of(true)),
        tap(f => {
          if (f && f.id) {
            this.flightForm.setValue(f);
          }
        })
      );
  }

  async onSubmit(flight: Flight): Promise<any> {
    if (this.flightForm.valid) {
      if (flight.id) {
        await this.flightService.update(flight).toPromise();
      } else {
        await this.flightService.create(flight).toPromise();
      }
      console.log('Go to flights');
      this.router.navigate(['/flights']);
    } else {
      alert(this.flightForm.status + 'form');
    }
  }
}
