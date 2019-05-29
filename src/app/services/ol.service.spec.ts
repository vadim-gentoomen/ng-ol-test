import { TestBed } from '@angular/core/testing';

import { OlService } from './ol.service';

describe('OlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OlService = TestBed.get(OlService);
    expect(service).toBeTruthy();
  });
});
