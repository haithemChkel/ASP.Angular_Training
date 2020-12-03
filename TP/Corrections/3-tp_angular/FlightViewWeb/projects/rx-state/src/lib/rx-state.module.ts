import { NgModule } from '@angular/core';
import { EventBusService, DataService, EntityRessourcesService } from './services';
import { StoreService } from './state';



@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [],
  providers: [EventBusService, StoreService, DataService, EntityRessourcesService]
})
export class RxStateModule { }
