import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarepointCardComponent } from './carepoint-card.component';

describe('CarepointCardComponent', () => {
  let component: CarepointCardComponent;
  let fixture: ComponentFixture<CarepointCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarepointCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarepointCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
