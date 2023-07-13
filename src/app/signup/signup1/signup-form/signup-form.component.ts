import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  phoneNumberInputGroup = new FormGroup({
    countryCode: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickNext(): void {
    console.log(this.phoneNumberInputGroup);
    this.router.navigate(['registration']);
  }

  onClickLoginNow(): void {
    this.router.navigate(['login']);
  }
}
