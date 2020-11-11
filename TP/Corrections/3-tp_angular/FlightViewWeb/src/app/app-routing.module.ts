import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { FlightDetailsComponent, FlightFormComponent, FlightListComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: '/flights', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'flights', component: FlightListComponent },
  { path: 'add', component: FlightFormComponent },
  { path: 'edit/:id', component: FlightFormComponent },
  { path: 'flight/:id', component: FlightDetailsComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
