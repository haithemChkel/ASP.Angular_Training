import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './components/public/public.component';
import { PublicRoutingModule } from './public-routing.module';



@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
