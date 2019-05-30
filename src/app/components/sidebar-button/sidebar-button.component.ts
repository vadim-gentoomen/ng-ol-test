import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.scss']
})
export class SidebarButtonComponent implements OnInit {
  @HostBinding('class.disabled-content') isDisabled = false;

  @Input('name') name = 'radio_button_unchecked';

  @Input('disabled-content') set disabledContent(state: boolean) {
    if (state != null) {
      this.isDisabled = state;
    }
  }
  @Output('buttonClick') buttonClick = new EventEmitter<string>();

  @HostListener('click') onClick(event: Event) {
    this.buttonClick.emit(this.name);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
