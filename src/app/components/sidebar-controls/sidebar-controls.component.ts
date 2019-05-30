import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SidebarButtonComponent} from '../sidebar-button/sidebar-button.component';
import {SidebarButton} from '../model/model';
import {SidebarStateService} from '../../services/sidebar-state.service';

@Component({
  selector: 'app-sidebar-controls',
  templateUrl: './sidebar-controls.component.html',
  styleUrls: ['./sidebar-controls.component.scss']
})
export class SidebarControlsComponent implements OnInit {

  @ViewChildren(SidebarButtonComponent) contentChildrenItems: QueryList<SidebarButtonComponent>;

  buttons$ = this.sidebarStateService.buttons$;

  constructor(private sidebarStateService: SidebarStateService) {
  }

  ngOnInit() {
  }

  onClick(button: SidebarButton) {
    this.sidebarStateService.changeState(button);
  }

}


