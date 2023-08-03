import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PhoneAuthGuard } from '../core/guards/phone-auth-guard/phone-auth.guard';



@NgModule({
  declarations: [ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent, canActivate: [PhoneAuthGuard] }
    ]),
    ReactiveFormsModule,
    NgOtpInputModule,
    NgbModule,
  ],
})
export class ForgotPasswordModule {

}
