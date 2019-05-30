import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OlService} from '../../services/ol.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;

  constructor(private ols: OlService) {
  }

  ngOnInit() {
    this.ols.initMap(this.mapElement.nativeElement);
  }

  click(name: string) {
    console.log(name);
  }

}
