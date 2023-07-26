import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { CarepointCardComponent } from './carepoint-card/carepoint-card.component';
import { RedemptionCatalogueComponent } from './redemption-catalogue/redemption-catalogue.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BottomNavbarComponent } from './bottom-navbar/bottom-navbar.component';
import { CarepointOptionsComponent } from './carepoint-options/carepoint-options.component';
import { CarepointRoundOptionsComponent } from './carepoint-round-options/carepoint-round-options.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CarouselComponent,
    CarepointCardComponent,
    RedemptionCatalogueComponent,
    CustomerReviewsComponent,
    HomepageComponent,
    BottomNavbarComponent,
    CarepointOptionsComponent,
    CarepointRoundOptionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomepageComponent }
    ])
  ]
})
export class HomeModule { }
