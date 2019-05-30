import {Component, OnDestroy, OnInit} from '@angular/core';
import {WfsService} from '../../services/wfs.service';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-portal-layers',
  templateUrl: './portal-layers.component.html',
  styleUrls: ['./portal-layers.component.scss']
})
export class PortalLayersComponent implements OnInit, OnDestroy {

  featureTypes$;

  private unsubscribe$ = new Subject<void>();

  constructor(private wfsService: WfsService) {
    // TODO: сделать нормально.
    this.featureTypes$ = this.wfsService.getFeatureTypes$()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((ids: string[]) => ids.slice(0, 10))
        );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
