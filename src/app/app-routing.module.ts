import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Signup1Component } from './signup/signup1/signup1.component';
import { MultiformSignupComponent } from './signup/multiform-signup/multiform-signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { HomepageComponent } from './home/homepage/homepage.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: Signup1Component },
  { path: 'registration', component: MultiformSignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'home', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
