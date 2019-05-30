import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPortalComponent } from './sidebar-portal.component';

describe('SidebarPortalComponent', () => {
  let component: SidebarPortalComponent;
  let fixture: ComponentFixture<SidebarPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
