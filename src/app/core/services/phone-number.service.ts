import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface PhoneGroup {
    countryCode: string;
    phoneNumber: string;
}

@Injectable({
    providedIn: 'root'
})
export class PhoneNumberService {
    phoneNumberGroup = new BehaviorSubject<PhoneGroup>(null);
    constructor() { }
}