import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Signup1Component } from './signup/signup1/signup1.component';
import { MultiformSignupComponent } from './signup/multiform-signup/multiform-signup.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'signup', component: Signup1Component },
  { path: 'registration', component: MultiformSignupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
