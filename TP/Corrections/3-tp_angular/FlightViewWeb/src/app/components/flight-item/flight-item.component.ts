import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flight } from 'src/app/models/flight';

@Component({
  selector: 'app-flight-item',
  templateUrl: './flight-item.component.html',
  styleUrls: ['./flight-item.component.scss']
})
export class FlightItemComponent implements OnInit {

  @Input() flight: Flight;
  @Output() selected = new EventEmitter<Flight>();
  @Output() delete = new EventEmitter<Flight>();

  constructor() { }

  ngOnInit(): void {
  }

  onItemSelected(event): void {
    this.selected.emit(this.flight);
  }

  onDelete(event): void {
    this.delete.emit(this.flight);
  }
}
