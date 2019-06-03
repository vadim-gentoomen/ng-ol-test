import {Component, Injector, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {SidebarStateService} from '../../services/sidebar-state.service';
import {SidebarButtonConfig} from '../../model/sidebarButtons';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {createInjector} from '../../model/portalData';


@Component({
  selector: 'app-sidebar-portal',
  templateUrl: './sidebar-portal.component.html',
  styleUrls: ['./sidebar-portal.component.scss']
})
export class SidebarPortalComponent implements OnInit, OnDestroy {
  selectedPortal: Portal<any>;

  private unsubscribe$ = new Subject<void>();

  constructor(private viewContainerRef: ViewContainerRef,
              private sidebarStateService: SidebarStateService,
              private injector: Injector) {
  }

  ngOnInit(): void {
    this.sidebarStateService.configs$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((configs: SidebarButtonConfig[]) => {

        if (configs.some((conf: SidebarButtonConfig) => conf.active)) {

          const config = configs.find((button: SidebarButtonConfig) => button.active);

          config.close = () => {
            this.sidebarStateService.closeAll();
          };

          this.selectedPortal = new ComponentPortal(config.viewerComponent, null, createInjector(this.injector, config));

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
