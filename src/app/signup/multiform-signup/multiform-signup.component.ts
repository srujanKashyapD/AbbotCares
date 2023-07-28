import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { PhoneGroup, PhoneNumberService } from '../../core/services/phone-number.service';

@Component({
  selector: 'app-multiform-signup',
  templateUrl: './multiform-signup.component.html',
  styleUrls: ['./multiform-signup.component.css']
})
export class MultiformSignupComponent implements OnInit {

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
  otpDetails!: FormGroup;
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
    private phoneService: PhoneNumberService
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

    this.otpDetails = this.formBuilder.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
      otp5: ['', Validators.required],
      otp6: ['', Validators.required],
    });

    this.otp = new FormControl('');

    this.phoneService.phoneNumberGroup.pipe(take(1)).subscribe( (phoneGroup: PhoneGroup) => {
      this.countryCode = phoneGroup.countryCode;
      this.phoneNumber = phoneGroup.phoneNumber;
    } ).unsubscribe();
  }

  get personal() { return this.passwordDetails.controls; }

  get address() { return this.registrationDetails.controls; }

  get education() { return this.otpDetails.controls; }

  next(): void {

    if (this.step === 1) {
      this.passwordStep = true;
      if (this.passwordDetails.value.password !== this.passwordDetails.value.confirmPassword) { return; }
      if (this.passwordDetails.invalid) { return; }
      this.pageTitle = 'Registration';
      this.step++;
    }

    else if (this.step === 2) {
      this.registrationStep = true;
      if (this.registrationDetails.invalid) { return; }
      this.pageTitle = 'SMS Verification';
      this.step++;
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
      // if (this.otpDetails.invalid) { return }
      console.log(this.otp);
    }
  }

  onChangeNumber(): void {
    this.router.navigate(['signup']);
  }

}
