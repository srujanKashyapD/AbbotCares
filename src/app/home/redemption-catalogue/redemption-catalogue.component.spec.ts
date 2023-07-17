import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionCatalogueComponent } from './redemption-catalogue.component';

describe('RedemptionCatalogueComponent', () => {
  let component: RedemptionCatalogueComponent;
  let fixture: ComponentFixture<RedemptionCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedemptionCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
