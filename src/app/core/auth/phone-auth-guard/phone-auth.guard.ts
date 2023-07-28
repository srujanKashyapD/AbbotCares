import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PhoneNumberService } from '../../services/phone-number.service';

@Injectable({
  providedIn: 'root'
})
export class PhoneAuthGuard implements CanActivate {

  constructor(private router: Router, private phoneNumberService: PhoneNumberService) { }


  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
              boolean | UrlTree |
              Observable<boolean | UrlTree> |
              Promise<boolean | UrlTree> {

    const isAuthenticated: boolean = this.phoneNumberService.isValidPhoneGroup();


    if (isAuthenticated) {
      return isAuthenticated;
    }
    else {
      if (state.url === '/forgot-password/reset-password') {
        return this.router.createUrlTree(['forgot-password']);
      }
      else if (state.url === '/signup/registration') {
        return this.router.createUrlTree(['signup']);
      }
      return isAuthenticated;
    }
  }
}
