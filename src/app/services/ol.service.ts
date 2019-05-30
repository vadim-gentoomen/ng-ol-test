import {Injectable} from '@angular/core';
import {Map, View} from 'ol';
import {Tile} from 'ol/layer';
import {OSM, XYZ} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import {Attribution, defaults, MousePosition, ScaleLine} from 'ol/control';
import {Coordinate, format} from 'ol/coordinate';

@Injectable({
  providedIn: 'root'
})
export class OlService {
  map: Map;

  constructor() {
  }

  initMap(element: HTMLElement): void {
    const osm = new Tile({
      source: new OSM(),
    });

    const cycleMap = new Tile({
      source: new XYZ({
        url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
      })
    });

    this.map = new Map({
      target: element,
      layers: [osm],
      view: new View({
        center: fromLonLat([34.0, 45.0]),
        zoom: 8.5
      }),
      controls: defaults()
        .extend([
          new ScaleLine(),
          new MousePosition({
            projection: 'EPSG:4326',
            coordinateFormat: (coordinate: Coordinate): string => format(coordinate, '{y}, {x}', 6)
          }),
          new Attribution(),
        ]),
    });
  }
}