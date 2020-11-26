import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { FlightListComponent, FlightFormComponent, FlightDetailsComponent } from 'src/app/components';
import { AdminComponent } from './components/admin/admin.component';
import { CesiumComponent } from './components/cesium/cesium.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'flights', pathMatch: 'full' },
      { path: 'flights', component: FlightListComponent },
      { path: 'add', component: FlightFormComponent },
      { path: 'edit/:id', component: FlightFormComponent },
      { path: 'flight/:id', component: FlightDetailsComponent },
      { path: 'cesium', component: CesiumComponent }
    ]
  }]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
