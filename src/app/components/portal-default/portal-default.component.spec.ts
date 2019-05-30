import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalDefaultComponent } from './portal-default.component';

describe('PortalDefaultComponent', () => {
  let component: PortalDefaultComponent;
  let fixture: ComponentFixture<PortalDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
