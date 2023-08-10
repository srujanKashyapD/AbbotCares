import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneNumberService } from 'src/app/core/services/phone-number.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassForm: FormGroup = new FormGroup({
    phoneDetails: new FormGroup({
      countryCode: new FormControl(''),
      phoneNumber: new FormControl(''),
    }),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private phoneService: PhoneNumberService
  ) {}

  ngOnInit(): void {}

  onClickReset(): void {
    console.log(this.forgotPassForm);
    const cCode: string = this.forgotPassForm.value.phoneDetails.countryCode;
    const phNum: string = this.forgotPassForm.value.phoneDetails.phoneNumber;
    this.phoneService.phoneNumberGroup.next({
      countryCode: cCode,
      phoneNumber: phNum,
    });
    this.router.navigate(['forgot-password', 'reset-password']);
  }

  onClickCancel(): void {
    this.router.navigate(['login']);
  }
}
