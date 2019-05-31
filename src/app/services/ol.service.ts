import {Injectable} from '@angular/core';
import {Map, View} from 'ol';
import {Tile} from 'ol/layer';
import {OSM, Stamen, XYZ} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import {Attribution, defaults, MousePosition, ScaleLine} from 'ol/control';
import {Coordinate, format} from 'ol/coordinate';
import Collection from 'ol/Collection';
import BaseLayer from 'ol/layer/Base';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Stroke, Style} from 'ol/style';
import Feature from 'ol/Feature';
import LayerType from 'ol/LayerType';
import {createXYZ} from 'ol/tilegrid';

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

    const vectorSource = new VectorSource();
    const vector = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(0, 0, 255, 1.0)',
          width: 2
        })
      })
    });
    vector.setProperties({name: 'VectorLayer'});

    this.map = new Map({
      target: element,
      layers: [osm, cycleMap, vector, watercolor, terrain, toner],
      view: new View({
        // center: fromLonLat([84.958757, 56.513178]), // Томск
        center: fromLonLat([34.0, 45.0]), // Крым
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

  getLayers(): Collection<BaseLayer> {
    return this.map.getLayers();
  }

  addFeatures(features: Feature[]): void {
    const layers = this.map.getLayers().getArray();
    const vectorLayer = layers.find((layer) => layer.getType() === LayerType.VECTOR) as VectorLayer;
    const vectorSource = vectorLayer.getSource();
    vectorSource.addFeatures(features);

    // TODO: !!!!!! WTF???
    // const extent: Extent  = vectorSource.getExtent();
    // this.map.getView().fit(extent);
  }
}
