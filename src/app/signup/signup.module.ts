import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Signup1Component } from './signup1/signup1.component';
import { SignupFormComponent } from './signup1/signup-form/signup-form.component';
import { MultiformSignupComponent } from './multiform-signup/multiform-signup.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { CommonModulesModule } from '../common-modules/common-modules.module';

@NgModule({
  declarations: [Signup1Component, SignupFormComponent, MultiformSignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    CommonModulesModule,
    
  ],
  exports: [
    Signup1Component,
    MultiformSignupComponent,
  ],
})
export class SignupModule { }
