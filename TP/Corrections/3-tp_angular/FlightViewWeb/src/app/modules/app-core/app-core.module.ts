import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightListComponent, FlightItemComponent, FlightDetailsComponent, FlightFormComponent } from 'src/app/components';
import { ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FlightListComponent,
    FlightItemComponent,
    FlightDetailsComponent,
    FlightFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatModule
  ]
})
export class AppCoreModule { }
