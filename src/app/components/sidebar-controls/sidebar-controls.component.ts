import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SidebarButtonComponent} from '../sidebar-button/sidebar-button.component';
import {SidebarButtonConfig} from '../../model/sidebarButtons';
import {SidebarStateService} from '../../services/sidebar-state.service';

@Component({
  selector: 'app-sidebar-controls',
  templateUrl: './sidebar-controls.component.html',
  styleUrls: ['./sidebar-controls.component.scss']
})
export class SidebarControlsComponent implements OnInit {

  @ViewChildren(SidebarButtonComponent) contentChildrenItems: QueryList<SidebarButtonComponent>;

  config$ = this.sidebarStateService.configs$;

  constructor(private sidebarStateService: SidebarStateService) {
  }

  ngOnInit() {
  }

  onClick(config: SidebarButtonConfig) {
    this.sidebarStateService.toggleState(config);
  }

}


