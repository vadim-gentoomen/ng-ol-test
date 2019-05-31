import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.scss']
})
export class SidebarButtonComponent implements OnInit {

  @Input('id')
  id: number;

  @Input('iconId')
  iconId: string;

  @Input('active')
  @HostBinding('class.active')
  active: boolean;

  @Input('disabled')
  @HostBinding('class.disabled')
  disabled: boolean;

  @Input('description')
  description: string;

  constructor() {
  }

  ngOnInit() {
  }


}
