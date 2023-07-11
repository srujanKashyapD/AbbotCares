import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup1Component } from '../signup1/signup1.component';

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
      'height': '35px',
      'width': '35px',
      'background-color': 'var(--light-grey)',
      'border-radius': '5px',
      'border': 'none!important',
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
  password_step = false;
  registration_step = false;
  otp_step = false;
  step = 1;

  otp: FormControl;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

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
  }

  get personal() { return this.passwordDetails.controls; }

  get address() { return this.registrationDetails.controls; }

  get education() { return this.otpDetails.controls; }

  next() {

    if (this.step == 1) {
      this.password_step = true;
      if (this.passwordDetails.invalid) { return }
      this.pageTitle = 'Registration';
      this.step++
    }

    else if (this.step == 2) {
      this.registration_step = true;
      if (this.registrationDetails.invalid) { return }
      this.pageTitle = 'SMS Verification';
      this.step++;
    }


  }

  previous() {
    this.step--

    if (this.step == 1) {
      this.registration_step = false;
    }
    if (this.step == 2) {
      this.otp_step = false;
    }

  }

  submit():void {

    if (this.step == 3) {
      this.otp_step = true;
      // if (this.otpDetails.invalid) { return }
      console.log(this.otp)
    }
  }

  onChangeNumber(): void {
    this.router.navigate(['signup']);
  }

}
