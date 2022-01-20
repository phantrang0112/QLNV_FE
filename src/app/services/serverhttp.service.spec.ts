import { TestBed } from '@angular/core/testing';

import { ServerhttpService } from './serverhttp.service';

describe('ServerhttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerhttpService = TestBed.get(ServerhttpService);
    expect(service).toBeTruthy();
  });
});
