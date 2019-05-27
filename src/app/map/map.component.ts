import {Component, OnInit} from '@angular/core';
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import {Tile} from 'ol/layer';
import {Attribution, defaults, MousePosition, ScaleLine, ZoomSlider} from 'ol/control';
import {OSM, XYZ} from 'ol/source';
import {Coordinate, format} from 'ol/coordinate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: Map;

  constructor() {
  }

  ngOnInit() {
    const osm = new Tile({
      source: new OSM(),
    });

    const cycleMap = new Tile({
      source: new XYZ({
        url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
      })
    });

    this.map = new Map({
      target: 'map',
      layers: [osm],
      view: new View({
        center: fromLonLat([34.0, 45.0]),
        zoom: 8.3
      }),
      controls: defaults()
        .extend([
          new ScaleLine(),
          new MousePosition({
            projection: 'EPSG:4326',
            coordinateFormat: (coordinate: Coordinate): string => format(coordinate, '{y}, {x}', 6)
          }),
          new Attribution(),
          new ZoomSlider(),
        ]),
    });
  }

}
