import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { ApiServiceService } from 'src/app/core/services/api-service.service';
import { Customer } from 'src/app/shared/customer.model';
import { Validate } from 'src/app/shared/validate.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetails = new FormGroup({
    phoneDetails: new FormGroup({
      countryCode: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    }),
    password: new FormControl('', Validators.required),
    keepLoggedInState: new FormControl(false, Validators.required)
  });

  showPassword = false;

  constructor(private router: Router, private apiService: ApiServiceService) { }

  ngOnInit(): void {
  }


  public togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


  onClickNext(): void {
    const mobileNumber = (this.loginDetails.value.phoneDetails.countryCode).replace('+', '') +
      this.loginDetails.value.phoneDetails.phoneNumber;
    const password = this.loginDetails.value.password;

    let customerDetails: Customer = {
      mobileNumber: mobileNumber,
      password: password,
      cnfPassword: password
    };
    localStorage.setItem('mobile-number', mobileNumber);

    this.apiService.generateSession(customerDetails)
      .pipe(
        concatMap(val => this.apiService.validatePassword(customerDetails))
      ).subscribe((isValid: boolean) => {
        if (isValid) {
          this.router.navigate(['home']);
        }
      }
    );

  }

  onClickForgotPassword(): void {
    this.router.navigate(['forgot-password']);
  }

  onClickSignUpNow(): void {
    this.router.navigate(['signup']);
  }

}
