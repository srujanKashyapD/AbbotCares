import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarepointRoundOptionsComponent } from './carepoint-round-options.component';

describe('CarepointRoundOptionsComponent', () => {
  let component: CarepointRoundOptionsComponent;
  let fixture: ComponentFixture<CarepointRoundOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarepointRoundOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarepointRoundOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
