import { TestBed } from '@angular/core/testing';

import { LinkConfigService } from './link-config.service';

describe('LinkConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkConfigService = TestBed.get(LinkConfigService);
    expect(service).toBeTruthy();
  });
});
