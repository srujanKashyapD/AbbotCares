import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarepointOptionsComponent } from './carepoint-options.component';

describe('CarepointOptionsComponent', () => {
  let component: CarepointOptionsComponent;
  let fixture: ComponentFixture<CarepointOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarepointOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarepointOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
