import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { FlightListComponent, FlightFormComponent, FlightDetailsComponent } from 'src/app/components';
import { PublicComponent } from './components/public/public.component';

const routes: Routes = [
    {
    path: '', component: PublicComponent,
    children: [
      { path: '', redirectTo: 'flights', pathMatch: 'full' },
      { path: 'flights', component: FlightListComponent },
      { path: 'add', component: FlightFormComponent },
      { path: 'edit/:id', component: FlightFormComponent },
      { path: 'flight/:id', component: FlightDetailsComponent }
    ]
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
