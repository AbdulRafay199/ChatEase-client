import { TestBed } from '@angular/core/testing';

import { ExternalElementService } from './external-element.service';

describe('ExternalElementService', () => {
  let service: ExternalElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
