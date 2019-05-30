import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {SidebarStateService} from '../../services/sidebar-state.service';
import {SidebarButton} from '../model/model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PortalLayersComponent} from '../portal-layers/portal-layers.component';
import {PortalDefaultComponent} from '../portal-default/portal-default.component';

@Component({
  selector: 'app-sidebar-portal',
  templateUrl: './sidebar-portal.component.html',
  styleUrls: ['./sidebar-portal.component.scss']
})
export class SidebarPortalComponent implements OnInit, OnDestroy {
  selectedPortal: Portal<any>;

  private unsubscribe$ = new Subject<void>();

  constructor(private viewContainerRef: ViewContainerRef,
              private sidebarStateService: SidebarStateService) {
  }

  ngOnInit(): void {
    this.sidebarStateService.buttons$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((buttons: SidebarButton[]) => {

        if (buttons.some((button: SidebarButton) => button.active)) {
          const {id} = buttons.find((button: SidebarButton) => button.active);
          if (id === 0) {
            this.selectedPortal = new ComponentPortal(PortalLayersComponent);
          } else {
            this.selectedPortal = new ComponentPortal(PortalDefaultComponent);
          }

        } else {
          if (this.selectedPortal && this.selectedPortal.isAttached) {
            this.selectedPortal.detach();
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
