import { Component, ViewChild } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  menuOpened = false;

  menuHovered = false;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor() {
    registerLocaleData(localeFr, 'fr');
  }

  clickHandler(): void {
    this.sidenav.close();
  }

  onMenuMouseOver(): void {
    this.menuHovered = true;
    this.menuHovered = false; // TO_DO: We want to disable menu hovering as it is quite annoying. :-)
  }

  onMenuMouseOut(): void {
    this.menuHovered = false;
  }

  onMenuButtonClicked(event: MouseEvent): void {
    this.menuOpened = !this.menuOpened;
  }
}
