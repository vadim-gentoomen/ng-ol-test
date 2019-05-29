import { TestBed } from '@angular/core/testing';

import { WfsService } from './wfs.service';

describe('WfsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WfsService = TestBed.get(WfsService);
    expect(service).toBeTruthy();
  });
});
