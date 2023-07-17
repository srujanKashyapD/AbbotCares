import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    NgbModule,
  ],
  exports: [
    ForgotPasswordComponent,
    ResetPasswordComponent
  ]
})
export class ForgotPasswordModule {
  
 }
