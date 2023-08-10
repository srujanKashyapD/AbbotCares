import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

export interface PhoneGroup {
  countryCode: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class PhoneNumberService {
  phoneNumberGroup = new BehaviorSubject<PhoneGroup>(null);
  private isPhoneValid = false;

  constructor() {}

  isValidPhoneGroup(): boolean {
    this.phoneNumberGroup
      .pipe(take(1))
      .subscribe(
        (phoneGroup: PhoneGroup) => {
          if (
            phoneGroup &&
            phoneGroup.countryCode &&
            phoneGroup.countryCode !== '' &&
            phoneGroup.phoneNumber &&
            phoneGroup.phoneNumber !== ''
          ) {
            this.isPhoneValid = true;
          }
        },
        (error) => {
          console.error(error);
        }
      )
      .unsubscribe();

    return this.isPhoneValid;
  }
}
