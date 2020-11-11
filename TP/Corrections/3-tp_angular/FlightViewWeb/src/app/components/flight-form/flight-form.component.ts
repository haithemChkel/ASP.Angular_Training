import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  private sub: Subscription;
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
        switchMap(id => this.flightService.getFlightById(id)),
        tap(f => {
          this.flightForm.setValue(f);
        })
      );
  }

  onSubmit(flight: Flight): void {
    if (this.flightForm.valid) {
      this.flightService.addFlight(flight);
      this.router.navigate(['/flights']);
    } else {
      alert(this.flightForm.status + 'form');
    }
  }
}
