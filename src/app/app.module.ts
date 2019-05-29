import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MapComponent } from './components/map/map.component';
import {OlService} from './services/ol.service';

@NgModule({
  declarations: [
    AppComponent,
    OverlaysComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [OlService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ol: OlService) {
  }
}
