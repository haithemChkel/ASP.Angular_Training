import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flight } from 'src/app/models';
import { FlightService } from 'src/app/services';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss']
})
export class FlightFormComponent implements OnInit {
  flightForm: FormGroup;
  constructor(private readonly formBuilder: FormBuilder, private readonly flightService: FlightService) {
    this.flightForm = this.formBuilder.group({
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
  }

  onSubmit(flight: Flight): void {
    if (this.flightForm.valid) {
      this.flightService.addFlight(flight);
      this.flightForm.reset();
    } else{
      alert(this.flightForm.status + 'form');
    }
  }

}
