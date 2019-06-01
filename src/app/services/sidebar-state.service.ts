import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {SidebarButtonConfig} from '../model/sidebarButtons';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {publishReplay, refCount, scan} from 'rxjs/operators';
import {PortalLayersComponent} from '../components/portal-layers/portal-layers.component';
import {PortalDefaultComponent} from '../components/portal-default/portal-default.component';
import {PortalImportComponent} from '../components/portal-import/portal-import.component';

type UpdateOperation = (buttons: SidebarButtonConfig[]) => SidebarButtonConfig[];

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {

  private buttonsUpdateOperation$ = new Subject<UpdateOperation>();

  private sbConfigs$ = new BehaviorSubject<SidebarButtonConfig[]>(sbConfigs);
  public readonly configs$: Observable<SidebarButtonConfig[]> = this.sbConfigs$.asObservable()
    .pipe(publishReplay(1), refCount());

  constructor() {
    this.buttonsUpdateOperation$
      .pipe(
        scan((configs: SidebarButtonConfig[], operation: UpdateOperation) => operation(configs), this.sbConfigs$.getValue()),
      )
      .subscribe(this.sbConfigs$);
  }

  toggleState(config: SidebarButtonConfig): void {
    const updateFunction: UpdateOperation = (oldConfigs: SidebarButtonConfig[]) => {
      const configs = _.clone(oldConfigs);
      _.each(configs, (item: SidebarButtonConfig) => {
        if (item.id !== config.id) {
          item.active = false; // Все кнопки не активны.
        } else {
          item.active = !item.active; // Переключение текущей кнопки.
        }
      });
      return configs;
    };

    this.buttonsUpdateOperation$.next(updateFunction);
  }

  closeAll(): void {
    const updateFunction: UpdateOperation = (oldConfigs: SidebarButtonConfig[]) => {
      const configs = _.clone(oldConfigs);
      _.each(configs, (item: SidebarButtonConfig) => {
        item.active = false; // Все кнопки не активны.
      });
      return configs;
    };

    this.buttonsUpdateOperation$.next(updateFunction);
  }

}

const sbConfigs: SidebarButtonConfig[] = [
  {
    id: 0,
    iconId: 'layers',
    disabled: false,
    active: false,
    description: 'Слои',
    viewerComponent: PortalLayersComponent
  },
  {
    id: 1,
    iconId: 'cloud_download',
    disabled: false,
    active: false,
    description: 'Импорт',
    viewerComponent: PortalImportComponent
  },
  {
    id: 2,
    iconId: 'edit_location',
    disabled: false,
    active: false,
    description: 'Редактировать что-то ---',
    viewerComponent: PortalDefaultComponent
  },
  {
    id: 3,
    iconId: 'highlight_off',
    disabled: true,
    active: false,
    description: 'Выключено',
    viewerComponent: PortalDefaultComponent
  },
  {
    id: 4,
    iconId: 'info',
    disabled: false,
    active: false,
    description: 'Информация',
    viewerComponent: PortalDefaultComponent
  },
];
