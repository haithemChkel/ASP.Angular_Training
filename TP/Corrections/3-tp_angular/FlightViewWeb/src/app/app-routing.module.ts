import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { FlightDetailsComponent, FlightFormComponent, FlightListComponent } from './components';

const routes: Routes = [
  {path: '', redirectTo: 'public', pathMatch : 'full'},
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin').then(m => m.AdminModule)
  },
  {
    path: 'public',
    loadChildren: () => import('./modules/public').then(m => m.PublicModule)
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
