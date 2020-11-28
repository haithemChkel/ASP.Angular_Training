import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './mat.module';
import { HeaderComponent } from './components';
import { AppCoreModule } from './modules/app-core';
import { EntitiesConfig, ENTITIES_CONFIG } from 'projects/rx-state/src/public-api';
import { environment } from 'src/environments/environment';
import { entityHttpResourceUrls } from './entities';

const APP_CONFIG: EntitiesConfig = {
  entitiesRessources: entityHttpResourceUrls,
  apiEndpoint : environment.apiUrl

};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatModule,
    AppCoreModule
  ],
  providers: [{ provide: ENTITIES_CONFIG, useValue: APP_CONFIG }],
  bootstrap: [AppComponent]
})
export class AppModule { }
