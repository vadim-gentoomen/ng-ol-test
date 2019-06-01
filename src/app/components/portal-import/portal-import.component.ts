import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {PORTAL_DATA} from '../../model/portalData';
import {WfsService} from '../../services/wfs.service';
import {OlService} from '../../services/ol.service';
import {Subject} from 'rxjs';
import {SidebarButtonConfig} from '../../model/sidebarButtons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-portal-import',
  templateUrl: './portal-import.component.html',
  styleUrls: ['./portal-import.component.scss']
})
export class PortalImportComponent implements OnInit, OnDestroy {

  config: SidebarButtonConfig;
  geoServerForm: FormGroup;

  featureTypeNames: string[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(@Inject(PORTAL_DATA) private data,
              public form: FormBuilder,
              private wfsService: WfsService,
              private olService: OlService) {

    this.config = this.data as SidebarButtonConfig;
    this.geoServerForm = this.form.group({
      url: [environment.wfsUrl, Validators.compose([
        Validators.required,
        Validators.minLength(1),
      ])],
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getFeatureTypes(): void {
    if (this.geoServerForm.valid) {
      const url = this.geoServerForm.get('url').value;
      this.wfsService.getFeatureTypes$(url)
        .pipe(
          first()
        )
        .subscribe({
          next: (featureTypeNames: string[]) => {
            this.featureTypeNames = featureTypeNames.slice(0, 20);
          },
          error: (err => {
            this.geoServerForm.setErrors({wrongUrl: err});
          })
        });
    }
  }

  selectType(featureTypes: string): void {
    this.wfsService.featureRequest$([featureTypes])
      .pipe(
        first()
      )
      .subscribe(data => {
        console.log(data);
      });
  }


}
