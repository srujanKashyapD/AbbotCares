import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PhoneGroup, PhoneNumberService } from 'src/app/core/services/phone-number.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

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

  showModal = false;

  countryCode: string;
  phoneNumber: string;

  phoneNumSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private modalService: NgbModal,
    private phoneService: PhoneNumberService
    ) { }

  ngOnInit() {

    this.passwordDetails = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
    });

    this.otpDetails = this.formBuilder.group({
      otp: new FormControl(null)
    });

    this.phoneNumSubscription = this.phoneService.phoneNumberGroup.subscribe((phoneGroup: PhoneGroup) => {
      this.countryCode = phoneGroup.countryCode;
      this.phoneNumber = phoneGroup.phoneNumber;
    });
  }

  ngOnDestroy(): void {
      this.phoneNumSubscription.unsubscribe();
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

  submit(modal): void {

    

    if (this.step == 2) {
      this.otp_step = true;
      // if (this.otpDetails.invalid) { return }
      this.showModal = true;

      this.modalService.open(modal);
      console.log(this.showModal);
      console.log(this.otpDetails);
    }
  }

  onChangeNumber(): void {
    this.router.navigate(['forgot-password']);
  }

  onOtpChange(otp) {
    this.otp = otp;
    // console.log(otp);
  }

  onClickBackToLogin(modal: NgbActiveModal): void {
    console.log(modal);
    modal.close('back to login');
    this.router.navigate(['login'])
  }

}
