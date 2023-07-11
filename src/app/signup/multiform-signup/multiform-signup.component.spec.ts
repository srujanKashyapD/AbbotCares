import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiformSignupComponent } from './multiform-signup.component';

describe('MultiformSignupComponent', () => {
  let component: MultiformSignupComponent;
  let fixture: ComponentFixture<MultiformSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiformSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiformSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
