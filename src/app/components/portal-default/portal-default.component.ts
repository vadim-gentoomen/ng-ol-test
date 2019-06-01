import {Component, Inject, OnInit} from '@angular/core';
import {PORTAL_DATA} from '../../model/portalData';
import {SidebarButtonConfig} from '../../model/sidebarButtons';

@Component({
  selector: 'app-portal-default',
  templateUrl: './portal-default.component.html',
  styleUrls: ['./portal-default.component.scss']
})
export class PortalDefaultComponent implements OnInit {

  config: SidebarButtonConfig;

  constructor(@Inject(PORTAL_DATA) private data) {

    this.config = this.data as SidebarButtonConfig;

  }

  ngOnInit() {
  }

}
