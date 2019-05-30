import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalLayersComponent } from './portal-layers.component';

describe('PortalLayersComponent', () => {
  let component: PortalLayersComponent;
  let fixture: ComponentFixture<PortalLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalLayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
