import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit, OnDestroy {

  @Input() flight: Flight;
  private sub: Subscription;

  constructor(private readonly route: ActivatedRoute, private readonly flightService: FlightService) { }

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
       map(params => +params.id),
       switchMap(id => this.flightService.getFlightById(id))
       ).subscribe(f => {
         this.flight = f;
        });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
