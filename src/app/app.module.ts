import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OverlaysComponent} from './components/overlays/overlays.component';
import {MapComponent} from './components/map/map.component';
import {OlService} from './services/ol.service';
import {WfsService} from './services/wfs.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './app-angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    OverlaysComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    OlService,
    WfsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ol: OlService,
              private wfs: WfsService) {
  }
}
