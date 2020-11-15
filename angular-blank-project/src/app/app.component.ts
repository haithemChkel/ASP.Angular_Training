import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  clients = [1, 2, 3, 4, 5, 6, 99, 45, 4, 8];
  title = 'angular-blank-project';
}
