import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'Flight View';

  @Input() menuOpen: boolean;
  @Output() readonly menuButtonClick = new EventEmitter<MouseEvent>();

  constructor() {}

  ngOnInit(): void {}

  onMenuButtonClicked(event: MouseEvent): void {
    this.menuButtonClick.emit(event);
  }
}
