import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { concatMap, map, take, tap, filter, mergeMap, switchMap, catchError } from 'rxjs/operators';

import { PhoneGroup, PhoneNumberService } from '../../core/services/phone-number.service';
import { ApiServiceService } from 'src/app/core/services/api-service.service';
import { Observable, Subscription, of } from 'rxjs';
import { Validate } from 'src/app/shared/validate.model';

@Component({
  selector: 'app-multiform-signup',
  templateUrl: './multiform-signup.component.html',
  styleUrls: ['./multiform-signup.component.css']
})
export class MultiformSignupComponent implements OnInit, OnDestroy {

  private subscriptionArray = [];

  otpConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      height: '35px',
      width: '35px',
      'background-color': 'var(--light-grey)',
      'border-radius': '5px',
      border: 'none!important',
    },
    containerStyles: {
    },
    inputClass: '',
    containerClass: ''
  };

  pageTitle = 'Create Password';

  passwordDetails!: FormGroup;
  registrationDetails!: FormGroup;
  otpDetails!: string;
  otpFormControl: FormGroup;
  passwordStep = false;
  registrationStep = false;
  otpStep = false;
  step = 1;

  otp: FormControl;

  countryCode: string;
  phoneNumber: string;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private phoneService: PhoneNumberService,
    private apiService: ApiServiceService
  ) { }




  ngOnInit(): void {

    this.passwordDetails = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
    });

    this.registrationDetails = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      brandPurchased: ['', Validators.required],
      privacyPolicy: ['', Validators.required],
      dataPrivacy: ['', Validators.required]
    });

    this.otpFormControl = this.formBuilder.group({
      otpHolder: ['', Validators.required]
    })

    this.otp = new FormControl('');

    this.subscriptionArray.push(
      this.phoneService.phoneNumberGroup.pipe(take(1)).subscribe( (phoneGroup: PhoneGroup) => {
      this.countryCode = phoneGroup.countryCode;
      this.phoneNumber = phoneGroup.phoneNumber;
      } )
    );
  }

  get personal() { return this.passwordDetails.controls; }

  get address() { return this.registrationDetails.controls; }

  next(): void {

    if (this.step === 1) {
      this.passwordStep = true;
      if (this.passwordDetails.value.password !== this.passwordDetails.value.confirmPassword) { return; }
      if (this.passwordDetails.invalid) { return; }
      this.pageTitle = 'Registration';
      this.step++;
    }
    else if (this.step === 2) {

      const phone = (this.countryCode + this.phoneNumber).replace('+', '');
      this.subscriptionArray.push(
        this.validateEmail(phone, this.registrationDetails.value.email).pipe()
        .subscribe((isValid: boolean) => {
          if(isValid) {
            this.registrationStep = true;
            if (this.registrationDetails.invalid) { return; }
            this.pageTitle = 'SMS Verification';
            this.step++;
          }
        })
      );
    }


  }

  previous(): void {
    this.step--;

    if (this.step === 1) {
      this.registrationStep = false;
    }
    if (this.step === 2) {
      this.otpStep = false;
    }

  }

  submit(): void {
    if (this.step === 3) {
      this.otpStep = true;
      const phone = (this.countryCode + this.phoneNumber).replace('+', '');
      localStorage.setItem('mobile-number', phone);
      this.apiService.validateOtp(phone, this.otpDetails)
        .pipe(filter((data: Validate) => data.status.success === true),
        switchMap(val => this.apiService.getCustomerByPhone(phone)
          .pipe(
            tap((data)=> {
              if(data.status.code !== 500)
                this.router.navigate(['login'])
            })
          )),
        tap((data) => console.log(data)),
        switchMap(val => this.apiService.getCustomerByEmail(this.registrationDetails.value.email)
          .pipe(
            tap((data)=> {
              if(data.status.code !== 500)
                this.router.navigate(['login'])
            })
          )),
        switchMap( val => this.apiService.addNewCustomer(
          { 
            firstName: this.registrationDetails.value.firstName, 
            lastName: this.registrationDetails.value.lastName
          }, 
          this.registrationDetails.value.email,
          this.registrationDetails.value.brandPurchased
        ).pipe(
            filter((data: Validate) => data.status.code === 200),
            tap(() => this.router.navigate(['home']))
          )),
          catchError(() => this.router.navigate(['signup']))
        ).subscribe();

    }
  }

  onChangeNumber(): void {
    this.router.navigate(['signup']);
  }

  onOtpChange(otp: string) {
    this.otpDetails = otp;
    
  }


  private validateEmail(mobile: string, email: string): Observable<boolean> {
    const customerObj = {
      mobileNumber: mobile, 
      password: this.passwordDetails.value.password,
      cnfPassword: this.passwordDetails.value.confirmPassword
    }

    return this.apiService.validateEmail(mobile, email)
      .pipe(switchMap((response) => {
          if(response.status === 200) {
            return this.apiService.generateSession(customerObj)
              .pipe(concatMap((data: Validate) => this.apiService.generateOtp(customerObj)));
          }
          else {
            return of(false);
          }
      }));

  }

  ngOnDestroy(): void {
      this.subscriptionArray.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
