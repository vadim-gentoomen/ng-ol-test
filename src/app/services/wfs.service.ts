import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GeoJSON, WFS} from 'ol/format';
import {environment} from '../../environments/environment';
import {first, map, publish} from 'rxjs/operators';
import {WriteGetFeatureOptions} from 'ol/format/WFS';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Stroke, Style} from 'ol/style';
import Feature from 'ol/Feature';
import {OlService} from './ol.service';

@Injectable({
  providedIn: 'root'
})
export class WfsService {

  constructor(private http: HttpClient,
              private olService: OlService) {
    // this.getFeatureTypes$()
    //   .subscribe(data => {
    //     console.log(data);
    //   });
    //
    // this.featureRequest$()
    //   .subscribe(data => {
    //     console.log(data);
    //   });
  }

  getFeatureTypes$(url = environment.wfsUrl): Observable<string[]> {
    const obs = new Observable((observer: Observer<any>) => {
      const params = {
        service: 'WFS',
        version: '2.0.0',
        request: 'DescribeFeatureType',
        outputFormat: 'application/json',
      };
      this.http.get(url, {
        params,
        responseType: 'json',
      })
        .pipe(
          first(),
          map((data: any) => {
            const {featureTypes = []} = data;
            return featureTypes.map(item => {
              const {typeName = ''} = item;
              return typeName;
            });
          }),
        )
        .subscribe({
          next: (value) => {
            observer.next(value);
          },
          complete: () => observer.complete(),
          error: (error) => {
            observer.error(error);
          }
        });

    }).pipe(publish());
    obs['connect']();

    return obs;
  }

  featureRequest$(featureTypes: any[] = ['MARoadClimaticZoneSegment']): Observable<any> {
    const obs = new Observable((observer: Observer<any>) => {
      const featureOptions: WriteGetFeatureOptions = {
        featureNS: '',
        featurePrefix: '',
        featureTypes,
        srsName: environment.projection,
        outputFormat: 'application/json'
      };

      const featureRequest = new WFS().writeGetFeature(featureOptions);

      const body = new XMLSerializer().serializeToString(featureRequest);

      this.http.post(environment.wfsUrl, body, {
        responseType: 'json'
      })
        .pipe(
          first(),
          map((data: any) => {
            const futures = new GeoJSON().readFeatures(data);
            return futures;
          }),
        )
        .subscribe({
          next: (features: Feature[]) => {
            observer.next(features);
            this.olService.addFeatures(features);
          },
          complete: () => observer.complete(),
          error: (error) => {
            observer.error(error);
          }
        });
    }).pipe(publish());
    obs['connect']();

    return obs;
  }
}
