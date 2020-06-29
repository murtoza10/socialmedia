import { TestBed } from '@angular/core/testing';

import { LoggedinAuthGuardService } from './loggedin-auth-guard.service';

describe('LoggedinAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggedinAuthGuardService = TestBed.get(LoggedinAuthGuardService);
    expect(service).toBeTruthy();
  });
});
