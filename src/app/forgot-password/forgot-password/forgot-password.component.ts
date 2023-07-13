import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassForm: FormGroup = new FormGroup({
    phoneDetails: new FormGroup({
      countryCode: new FormControl(''),
      phoneNumber: new FormControl('')
    })
  });


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickReset(): void {
    console.log(this.forgotPassForm);
    this.router.navigate(['reset-password']);
  }

  onClickCancel(): void {
    this.router.navigate(['login']);
  }

}
