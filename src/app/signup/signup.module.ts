import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Signup1Component } from './signup1/signup1.component';
import { SignupFormComponent } from './signup1/signup-form/signup-form.component';
import { MultiformSignupComponent } from './multiform-signup/multiform-signup.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [Signup1Component, SignupFormComponent, MultiformSignupComponent],
  imports: [
    CommonModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [Signup1Component, MultiformSignupComponent]
})
export class SignupModule { }
