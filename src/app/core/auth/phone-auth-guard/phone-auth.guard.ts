import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PhoneGroup, PhoneNumberService } from '../../services/phone-number.service';

@Injectable({
  providedIn: 'root'
})
export class PhoneAuthGuard implements CanActivate, OnDestroy {
  
  phoneSubscription: Subscription;

  constructor(private router: Router, private phoneNumberService: PhoneNumberService) { }
  

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    boolean | UrlTree |
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> {

    let isAuthenticated: boolean = false;
    this.phoneSubscription = this.phoneNumberService.phoneNumberGroup
      .subscribe((phoneGroup: PhoneGroup) => {
        if (phoneGroup && phoneGroup.countryCode && phoneGroup.countryCode !== '' &&
          phoneGroup.phoneNumber && phoneGroup.phoneNumber !== '') {
          isAuthenticated = true;
        }
      },
        (error) => {
          console.error(error);
        }
      );

    if (isAuthenticated)
      return isAuthenticated;
    else {
      if (state.url === '/reset-password') {
        return this.router.createUrlTree(['forgot-password']);
      }
      else if (state.url === '/registration') {
        return this.router.createUrlTree(['signup']);
      }
      return isAuthenticated;
    }
  }

  ngOnDestroy(): void {
    this.phoneSubscription.unsubscribe();
  }
}
