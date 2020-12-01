import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flight } from '@app/models';

@Component({
  selector: 'app-flight-item',
  templateUrl: './flight-item.component.html',
  styleUrls: ['./flight-item.component.scss']
})
export class FlightItemComponent {

  @Input() flight: Flight;
  @Output() selected = new EventEmitter<Flight>();
  @Output() delete = new EventEmitter<Flight>();

  onItemSelected(_): void {
    this.selected.emit(this.flight);
  }

  onDelete(_): void {
    this.delete.emit(this.flight);
  }
}
