import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OlService} from '../../services/ol.service';
import {Overlay} from 'ol';
import {fromLonLat} from 'ol/proj';
import OverlayPositioning from 'ol/OverlayPositioning';

@Component({
  selector: 'app-overlays',
  templateUrl: './overlays.component.html',
  styleUrls: ['./overlays.component.scss']
})
export class OverlaysComponent implements OnInit {
  @ViewChild('build', { static: true }) build: ElementRef;
  @ViewChild('work', { static: true }) work: ElementRef;

  constructor(private ols: OlService) {

  }

  ngOnInit(): void {

    const build = new Overlay({
      position: fromLonLat([34.092304, 44.981786]),
      element: this.build.nativeElement,
      positioning: OverlayPositioning.CENTER_CENTER
    });
    // this.ols.map.addOverlay(build);

    const work = new Overlay({
      position: fromLonLat([34.099185, 44.937494]),
      element: this.work.nativeElement,
      positioning: OverlayPositioning.CENTER_CENTER
    });
    // this.ols.map.addOverlay(work);
  }

}
