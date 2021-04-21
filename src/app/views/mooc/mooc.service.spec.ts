import { TestBed } from '@angular/core/testing';

import { MoocService } from './mooc.service';

describe('MoocService', () => {
  let service: MoocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
