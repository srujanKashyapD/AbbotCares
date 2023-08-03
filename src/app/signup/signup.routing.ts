import { RouterModule, Routes } from '@angular/router';
import { Signup1Component } from './signup1/signup1.component';
import { NgModule } from '@angular/core';
import { PhoneAuthGuard } from '../core/guards/phone-auth-guard/phone-auth.guard';
import { MultiformSignupComponent } from './multiform-signup/multiform-signup.component';

const routes: Routes = [
  {
    path: '',
    component: Signup1Component
  },
  {
    path: 'registration',
    component: MultiformSignupComponent,
    canActivate: [PhoneAuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
