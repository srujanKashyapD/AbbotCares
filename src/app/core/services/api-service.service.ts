import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  readonly apiUrl = 'https://eu.api.capillarytech.com/v3/';
  readonly wrapperApiUrl = 'https://apac-s3wrapper.capillarytech.com/'

  constructor(private http: HttpClient) { }


  addNewCustomer() {

  }

  generateSession(customerDetails: Customer): Observable<any> {
    const generateSessionBody = {
      brand: "ABBOTTALLDEMO",
      confirmPassword: customerDetails.cnfPassword,
      deviceId: "ABT123",
      identifierType: "MOBILE",
      identifierValue: customerDetails.mobileNumber,
      password: customerDetails.password,
    }
    const generateSessionApiUrl = this.apiUrl + 'auth/v1/token/generate';

    return this.http.post(generateSessionApiUrl, JSON.stringify(generateSessionBody));

  }

  validatePassword(customerDetails: Customer): boolean {

  }

  getCustomerData() {

  }
}
