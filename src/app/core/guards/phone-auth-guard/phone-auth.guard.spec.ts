import { TestBed } from '@angular/core/testing';

import { PhoneAuthGuard } from './phone-auth.guard';

describe('PhoneAuthGuard', () => {
  let guard: PhoneAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PhoneAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
