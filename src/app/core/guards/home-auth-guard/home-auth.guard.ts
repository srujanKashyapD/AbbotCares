import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiServiceService } from '../../services/api-service.service';
import { map, tap } from 'rxjs/operators';
import { CustomerDetail } from 'src/app/shared/models/customer-detail.model';

@Injectable({
  providedIn: 'root',
})
export class HomeAuthGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiServiceService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.apiService
      .getCustomerData(false, { enabled: false, gapDays: -1 }, false)
      .pipe(
        tap((data: CustomerDetail) => console.log(data)),
        map((data: CustomerDetail): boolean =>
          data.status.success === 'true' ? true : false
        ),
        map((isAuthorized: boolean) => {
          if (!isAuthorized) return this.router.createUrlTree(['login']);
          else return isAuthorized;
        })
      );
  }
}
