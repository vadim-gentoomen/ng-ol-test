import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CreateMapService} from '../../services/create-map.service';

@Component({
  selector: 'app-overlays',
  templateUrl: './overlays.component.html',
  styleUrls: ['./overlays.component.scss']
})
export class OverlaysComponent implements OnInit {
  @ViewChild('overlays') overlays: ElementRef;

  constructor() { }

  ngOnInit() {
  }

}
