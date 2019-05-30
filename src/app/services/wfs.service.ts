import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {WFS} from 'ol/format';
import {environment} from '../../environments/environment';
import {first, map, publish} from 'rxjs/operators';
import {WriteGetFeatureOptions} from 'ol/format/WFS';

@Injectable({
  providedIn: 'root'
})
export class WfsService {

  constructor(private http: HttpClient) {
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

  getFeatureTypes$(): Observable<string[]> {
    const obs = new Observable((observer: Observer<any>) => {
      const params = {
        service: 'WFS',
        version: '2.0.0',
        request: 'DescribeFeatureType',
        outputFormat: 'application/json',
      };
      this.http.get(environment.wfsUrl, {
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

  featureRequest$(): Observable<any> {
    const obs = new Observable((observer: Observer<any>) => {
      const featureOptions: WriteGetFeatureOptions = {
        featureNS: '',
        featurePrefix: '',
        featureTypes: ['MARoadClimaticZoneSegment'],
        srsName: environment.projection,
        outputFormat: 'application/json'
      };

      const featureRequest = new WFS().writeGetFeature(featureOptions);

      const body = new XMLSerializer().serializeToString(featureRequest);

      this.http.post(environment.wfsUrl, body, {
        responseType: 'json'
      })
        .pipe(
          first()
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
}
