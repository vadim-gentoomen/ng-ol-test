import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalImportComponent } from './portal-import.component';

describe('PortalImportComponent', () => {
  let component: PortalImportComponent;
  let fixture: ComponentFixture<PortalImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
