import { NgModule } from '@angular/core';
import { EventBusService, DataService, EntityCollectionService, EntityRessourcesService } from './services';



@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [],
  providers: [EventBusService, DataService, EntityCollectionService, EntityRessourcesService]
})
export class RxStateModule { }
