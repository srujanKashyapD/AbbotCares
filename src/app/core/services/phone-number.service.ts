import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

export interface PhoneGroup {
    countryCode: string;
    phoneNumber: string;
}

@Injectable({
    providedIn: 'root'
})
export class PhoneNumberService implements OnDestroy {
    phoneNumberGroup = new BehaviorSubject<PhoneGroup>(null);
    private isPhoneValid = false;
    private phoneSubscription: Subscription;

    constructor() { }

    isValidPhoneGroup(): boolean {
        this.phoneSubscription = this.phoneNumberGroup
            .subscribe((phoneGroup: PhoneGroup) => {
                if (phoneGroup && phoneGroup.countryCode && phoneGroup.countryCode !== '' &&
                    phoneGroup.phoneNumber && phoneGroup.phoneNumber !== '') {
                    this.isPhoneValid = true;
                }
            },
            (error) => {
                console.error(error);
            }
        );

        return this.isPhoneValid;
    }


    ngOnDestroy(): void {
        this.phoneSubscription.unsubscribe();
    }
}