import * as _ from 'lodash';
import {Injectable, QueryList} from '@angular/core';
import {SidebarButton} from '../components/model/model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {publishReplay, refCount, scan} from 'rxjs/operators';

type UpdateOperation = (buttons: SidebarButton[]) => SidebarButton[];

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {

  private buttonsUpdateOperation$ = new Subject<UpdateOperation>();

  private bsButtons$ = new BehaviorSubject<SidebarButton[]>(sbButtons);
  public readonly buttons$: Observable<SidebarButton[]> = this.bsButtons$.asObservable()
    .pipe(publishReplay(1), refCount());

  constructor() {
    this.buttonsUpdateOperation$
      .pipe(
        scan((buttons: SidebarButton[], operation: UpdateOperation) => operation(buttons), this.bsButtons$.getValue()),
      )
      .subscribe(this.bsButtons$);
  }

  changeState(button: SidebarButton): void {
    const updateFunction: UpdateOperation = (oldButtons: SidebarButton[]) => {
      // const buttons = _.clone(oldButtons);
      _.each(oldButtons, (item: SidebarButton) => {
        if (item.id !== button.id) {
          item.active = false;
        } else {
          item.active = !item.active;
        }
      });
      return oldButtons;
    };

    this.buttonsUpdateOperation$.next(updateFunction);
  }
}

const sbButtons: SidebarButton[] = [
  {
    id: 0,
    iconId: 'layers',
    disabled: false,
    active: false,
    description: 'Слои'
  },
  {
    id: 1,
    iconId: 'add_location',
    disabled: false,
    active: false,
    description: 'Добавить что-то ---'
  },
  {
    id: 2,
    iconId: 'edit_location',
    disabled: false,
    active: false,
    description: 'Редактировать что-то ---'
  },
  {
    id: 3,
    iconId: 'highlight_off',
    disabled: true,
    active: false,
    description: 'Выключено'
  },
  {
    id: 4,
    iconId: 'info',
    disabled: false,
    active: false,
    description: 'Информация о чем-то ---'
  },
];
