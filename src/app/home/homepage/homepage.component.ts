import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiServiceService } from 'src/app/core/services/api-service.service';
import { CustomerDetail } from 'src/app/shared/models/customer-detail.model';
import { CustomerData } from '../models/cutomer-data.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  customerData: CustomerData;
  private isLoading: boolean;

  private apiSubscription: Subscription;
  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService
      .getCustomerData(true, { enabled: true, gapDays: 0 }, true)
      .pipe(
        map((data: CustomerDetail) => {
          const customer = data.customers.customer[0];
          this.customerData = {
            userId: customer.user_id,
            firstName: customer.firstname,
            lastName: customer.lastname,
            mobile: customer.mobile,
            email: customer.email,
            currentSlab: customer.current_slab,
            loyaltyPoints: customer.loyalty_points,
            pointsUntilNextSlab:
              customer.points_summaries.points_summary[0].gap_to_upgrade
                .upgrade_strategy[0].customer_upgrade_entity_values
                .gap_to_upgrade,
            totalPointsUntilNextSlab:
              customer.points_summaries.points_summary[0].gap_to_upgrade
                .upgrade_strategy[0].upgrade_threshold,
          };
          return this.customerData;
        })
      )
      .subscribe((data) => {
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.apiSubscription) this.apiSubscription.unsubscribe();
  }
}
