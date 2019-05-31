import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {WfsService} from '../../services/wfs.service';
import {Subject} from 'rxjs';
import {PORTAL_DATA} from '../../model/portalData';
import {SidebarButtonConfig} from '../../model/sidebarButtons';
import {OlService} from '../../services/ol.service';
import BaseLayer from 'ol/layer/Base';

@Component({
  selector: 'app-portal-layers',
  templateUrl: './portal-layers.component.html',
  styleUrls: ['./portal-layers.component.scss']
})
export class PortalLayersComponent implements OnInit, OnDestroy {

  description: string;
  layers: BaseLayer[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(@Inject(PORTAL_DATA) public data,
              private wfsService: WfsService,
              private olService: OlService) {

    const {description = ''} = this.data as SidebarButtonConfig;
    this.description = description;

    this.layers = this.olService.getLayers().getArray();
    this.layers.forEach(layer => {
      console.log(layer.getProperties());
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  changeVisible($event, layer: BaseLayer): void {
    layer.setVisible($event.checked);
  }

}
