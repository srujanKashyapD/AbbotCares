import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Validate } from 'src/app/shared/auth.model';
import { CustomerDetail } from 'src/app/shared/customer-detail.model';
import { Customer } from 'src/app/shared/customer.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private readonly API_URL = 'https://apac-apigateway.capillarytech.com/';
  private readonly WRAPPER_API_URL = 'https://apac-s3wrapper.capillarytech.com/'

  constructor(private http: HttpClient) { }


  addNewCustomer() {

  }

  generateSession(customerDetails: Customer): void {
    const generateSessionBody = {
      brand: "ABBOTTALLDEMO",
      confirmPassword: customerDetails.cnfPassword,
      deviceId: "ABT123",
      identifierType: "MOBILE",
      identifierValue: customerDetails.mobileNumber,
      password: customerDetails.password,
    }
    const generateSessionApiUrl = this.WRAPPER_API_URL + 'auth/v1/token/generate';

    this.http.post<Validate>(generateSessionApiUrl, JSON.stringify(generateSessionBody)).pipe(
      map((data: Validate) => data.user.sessionId),
      tap((data: string) => {
        localStorage.setItem('session-id', data);
      })
    ).subscribe();
  }

  validatePassword(customerDetails: Customer): Observable<boolean> {
    const generateSessionBody = {
      brand: "ABBOTTALLDEMO",
      deviceId: "ABT123",
      identifierType: "MOBILE",
      identifierValue: customerDetails.mobileNumber,
      password: customerDetails.password,
      sessionId: localStorage.getItem('session-id')
    }

    const generateSessionApiUrl = this.WRAPPER_API_URL + 'auth/v1/password/validate';

    return this.http.post<Validate>(generateSessionApiUrl, JSON.stringify(generateSessionBody))
      .pipe(map((data: Validate) => {
          if (data.status.success) {
            return data.auth.token;
          } else {
            return '';
          }
        }),
        tap(token =>
          localStorage.setItem('token', token)
        ),
        map((data: string) => {
          return data !== '' ? true : false;
        })
      );

  }

  getCustomerData(): Observable<CustomerDetail>  {
    const getCustomerUrl = this.API_URL + 'mobile/v2/api/customer/get?format=json&mlp=true&gap_to_upgrade_for=0&slab_history=true&user_id=true';
    return this.http.get<CustomerDetail>(getCustomerUrl, { headers: new HttpHeaders({
      "cap_authorization": localStorage.getItem('token'),
      "cap_brand": "ABBOTTALLDEMO",
      "cap_device_id": 'ABT123',
      'cap_identifier_type': 'MOBILE',
      'cap_identifier_value': localStorage.getItem('mobile-number')
    })});
  }
}
