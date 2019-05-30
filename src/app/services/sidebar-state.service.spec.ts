import { TestBed } from '@angular/core/testing';

import { SidebarStateService } from './sidebar-state.service';

describe('SidebarStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SidebarStateService = TestBed.get(SidebarStateService);
    expect(service).toBeTruthy();
  });
});
