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
import {SidebarControlsComponent} from './components/sidebar-controls/sidebar-controls.component';
import {SidebarButtonComponent} from './components/sidebar-button/sidebar-button.component';
import {SidebarPortalComponent} from './components/sidebar-portal/sidebar-portal.component';
import {PortalModule} from '@angular/cdk/portal';
import {PortalLayersComponent} from './components/portal-layers/portal-layers.component';
import {PortalDefaultComponent} from './components/portal-default/portal-default.component';
import { PortalImportComponent } from './components/portal-import/portal-import.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    OverlaysComponent,
    MapComponent,
    SidebarControlsComponent,
    SidebarButtonComponent,
    SidebarPortalComponent,
    PortalLayersComponent,
    PortalDefaultComponent,
    PortalImportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PortalModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    OlService,
    WfsService
  ],
  entryComponents: [
    SidebarPortalComponent,
    PortalLayersComponent,
    PortalImportComponent,
    PortalDefaultComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ol: OlService,
              private wfs: WfsService) {
  }
}
