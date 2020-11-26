import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CesiumComponent } from './components/cesium/cesium.component';
import { CesiumDirective } from './directives/cesium.directive';

@NgModule({
  declarations: [AdminComponent, CesiumComponent, CesiumDirective],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
