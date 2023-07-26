import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PhoneNumberService } from '../../../core/services/phone-number.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  phoneNumberInputGroup = new FormGroup({
    countryCode: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private phoneService: PhoneNumberService) { }

  ngOnInit(): void {
  }

  onClickNext(): void {
    if (!this.phoneNumberInputGroup.valid)
      return;


    const cCode: string = this.phoneNumberInputGroup.value.countryCode;
    const phNum: string = this.phoneNumberInputGroup.value.phoneNumber;
    this.phoneService.phoneNumberGroup.next({ countryCode: cCode, phoneNumber: phNum });
    console.log(cCode + " and " + phNum);
    this.router.navigate(['signup','registration']);
  }

  onClickLoginNow(): void {
    this.router.navigate(['login']);
  }
}
