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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
