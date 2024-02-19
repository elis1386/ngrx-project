import { TestBed } from '@angular/core/testing';

import { PopularTagService } from './popular-tag.service';

describe('PopularTagService', () => {
  let service: PopularTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
