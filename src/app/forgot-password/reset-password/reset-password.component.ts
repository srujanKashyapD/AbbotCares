import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

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

  pageTitle: string = 'Reset Password';
  passwordDetails!: FormGroup;
  registrationDetails!: FormGroup;
  otpDetails!: FormGroup;
  password_step = false;
  registration_step = false;
  otp_step = false;
  step = 1;

  otp: string;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.passwordDetails = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
    });

    this.otpDetails = this.formBuilder.group({
      otp: new FormControl(null)
    });
  }

  get password() { return this.passwordDetails.controls; }

  get otpDet() { return this.otpDetails.controls; }

  next() {

    if (this.step == 1) {
      this.password_step = true;
      if (this.passwordDetails.invalid) { return }
      this.pageTitle = 'SMS Verification';
      this.step++
    }

  }

  submit(): void {

    if (this.step == 2) {
      this.otp_step = true;
      // if (this.otpDetails.invalid) { return }
      console.log(this.otpDetails);
    }
  }

  onChangeNumber(): void {
    this.router.navigate(['signup']);
  }

  onOtpChange(otp) {
    this.otp = otp;
    console.log(otp);
  }

}
