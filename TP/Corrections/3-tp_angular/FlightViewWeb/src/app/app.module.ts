import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { FlightItemComponent } from './components/flight-item/flight-item.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { FlightFormComponent } from './components/flight-form/flight-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './mat.module';
import { HeaderComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    FlightListComponent,
    FlightItemComponent,
    FlightDetailsComponent,
    FlightFormComponent,
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
