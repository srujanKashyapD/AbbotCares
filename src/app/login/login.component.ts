import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetails = new FormGroup({
    phoneDetails: new FormGroup({
      countryCode: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    }),
    password: new FormControl('', Validators.required),
    keepLoggedInState: new FormControl(false, Validators.required)
  })

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showPassword: boolean = false;

  public togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


  onClickNext(): void {
    console.log(this.loginDetails);

  }

  onClickForgotPassword(): void {
    this.router.navigate(['forgot-password']);
  }

  onClickSignUpNow(): void {
    this.router.navigate(['signup']);
  }

}
