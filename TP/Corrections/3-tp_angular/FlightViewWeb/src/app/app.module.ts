import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { FlightItemComponent } from './components/flight-item/flight-item.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { FlightFormComponent } from './components/flight-form/flight-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FlightListComponent,
    FlightItemComponent,
    FlightDetailsComponent,
    FlightFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
