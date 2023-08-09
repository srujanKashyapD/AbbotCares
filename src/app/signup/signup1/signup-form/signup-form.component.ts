import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhoneNumberService } from '../../../core/services/phone-number.service';
import { ApiServiceService } from 'src/app/core/services/api-service.service';
import { Customer } from 'src/app/shared/customer.model';
import { Validate } from 'src/app/shared/validate.model';

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

  constructor(private router: Router, 
    private phoneService: PhoneNumberService, 
    private apiService: ApiServiceService) { }

  ngOnInit(): void {
  }

  onClickNext(): void {
    if (!this.phoneNumberInputGroup.valid){
      return;
    }

    const cCode: string = this.phoneNumberInputGroup.value.countryCode;
    const phNum: string = this.phoneNumberInputGroup.value.phoneNumber;
    this.phoneService.phoneNumberGroup.next({ countryCode: cCode, phoneNumber: phNum });

    const customer: Customer = {
      mobileNumber: (cCode + phNum).replace('+', ''),
      password: '123456',
      cnfPassword: '123456'
    }
    this.apiService.generateSession(customer).pipe()
      .subscribe((data: Validate) => {
        if(data.user.userRegisteredForPassword) {
          this.router.navigate(['login']);
        }
        else {
          this.router.navigate(['signup', 'registration']);
        }
      });
  }

  onClickLoginNow(): void {
    this.router.navigate(['login']);
  }
}
