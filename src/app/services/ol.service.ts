import {Injectable} from '@angular/core';
import {Collection, Feature, Map, View} from 'ol';
import {Tile} from 'ol/layer';
import {OSM, Stamen, XYZ} from 'ol/source';
import {Attribution, defaults, MousePosition, ScaleLine} from 'ol/control';
import {Coordinate, format} from 'ol/coordinate';
import BaseLayer from 'ol/layer/Base';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Fill, Stroke, Style} from 'ol/style';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OlService {
  private map: Map;

  private draftSource = new VectorSource({
    features: [],
  });

  constructor() {
  }

  initMap(element: HTMLElement): void {
    const osm = new Tile({
      source: new OSM(),
      visible: true,
    });
    osm.setProperties({name: 'OpenStreetMap'});

    const cycleMap = new Tile({
      source: new XYZ({
        url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
      }),
      visible: false,
    });
    cycleMap.setProperties({name: 'OpenCycleMap'});

    const watercolor = new Tile({
      source: new Stamen({
        layer: 'watercolor'
      }),
      visible: false,
    });
    watercolor.setProperties({name: 'StamenWatercolor'});

    const terrain = new Tile({
      source: new Stamen({
        layer: 'terrain'
      }),
      visible: false,
    });
    terrain.setProperties({name: 'StamenTerrain'});

    const toner = new Tile({
      source: new Stamen({
        layer: 'toner'
      }),
      visible: false,
    });
    toner.setProperties({name: 'StamenToner'});

    /**
     * YandexMap со сдвигом, не работает.
     */
      // const yandex = new Tile({
      //   source: new XYZ({
      //     url: 'http://vec0{1-4}.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}',
      //     projection: 'EPSG:3395',
      //     tileGrid: createXYZ({
      //       extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
      //     })
      //   })
      // });
      // yandex.setProperties({name: 'YandexMap'});

    const vector = new VectorLayer({
        source: this.draftSource,
        zIndex: 10000,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.3)'
          }),
          stroke: new Stroke({
            color: '#ff0018',
            width: 2
          })
        })
      });
    vector.setProperties({name: 'VectorLayer'});

    this.map = new Map({
      target: element,
      layers: [
        osm,
        cycleMap,
        vector,
        watercolor,
        terrain,
        toner,
      ],
      view: new View({
        // center: fromLonLat([84.958757, 56.513178]), // Томск
        projection: environment.projection,
        center: [34, 45],
        zoom: 8.5
      }),
      controls: defaults()
        .extend([
          new ScaleLine(),
          new MousePosition({
            projection: environment.projection,
            coordinateFormat: (coordinate: Coordinate): string => format(coordinate, '{y}, {x}', 6)
          }),
          new Attribution(),
        ]),
    });
  }

  getLayers(): Collection<BaseLayer> {
    return this.map.getLayers();
  }

  drawFeatures(features: Feature[]): void {
    this.draftSource.addFeatures(features);

    if (features[0] && features[0].getGeometry()) {
      this.map.getView().fit(features[0].getGeometry().getExtent());
    } else {
      console.log('NO GEOMETRY ???', features[0]);
    }
  }

  clearDraft() {
    this.draftSource.clear();
  }

}
