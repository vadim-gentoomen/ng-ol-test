import {Component, Inject, OnInit} from '@angular/core';
import {PORTAL_DATA} from '../../model/portalData';
import {SidebarButtonConfig} from '../../model/sidebarButtons';

@Component({
  selector: 'app-portal-default',
  templateUrl: './portal-default.component.html',
  styleUrls: ['./portal-default.component.scss']
})
export class PortalDefaultComponent implements OnInit {

  description: string;

  constructor(@Inject(PORTAL_DATA) private data) {
    const {description = ''} = this.data as SidebarButtonConfig;
    this.description = description;
  }

  ngOnInit() {
  }

}
