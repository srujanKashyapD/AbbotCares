import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Validate } from 'src/app/shared/models/validate.model';
import { CustomerDetail } from 'src/app/shared/models/customer-detail.model';
import { Customer } from 'src/app/shared/models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private readonly API_URL = 'https://apac-apigateway.capillarytech.com/';
  private readonly WRAPPER_API_URL =
    'https://apac-s3wrapper.capillarytech.com/';

  constructor(private http: HttpClient) {}

  addNewCustomer(
    name: { firstName: string; lastName: string },
    email: string,
    chosenPlan: string
  ): Observable<Validate> {
    const url = this.API_URL + 'mobile/v2/api/customer/add';
    const now = new Date();
    const registeredDate = `${now.getFullYear()}-${now.getMonth() + 1}
      -${now.getDate()} ${now.getHours()}:${now.getMinutes}:${now.getSeconds}`;
    const payload = {
      root: {
        customer: [
          {
            mobile: localStorage.getItem('mobile-number'),
            firstname: name.firstName,
            lastname: name.lastName,
            email: email,
            registered_on: registeredDate,
            extended_fields: {
              field: [
                {
                  name: 'gender',
                  value: chosenPlan,
                },
                {
                  name: 'preferred_brand',
                  value: chosenPlan,
                },
              ],
            },
          },
        ],
      },
    };
    return this.http.post<Validate>(url, payload, {
      headers: this.getHeadersWithAuthToken(),
    });
  }

  generateSession(customerDetails: Customer): Observable<Validate> {
    const generateSessionBody = {
      brand: 'ABBOTTALLDEMO',
      confirmPassword: customerDetails.cnfPassword,
      deviceId: 'ABT123',
      identifierType: 'MOBILE',
      identifierValue: customerDetails.mobileNumber,
      password: customerDetails.password,
    };
    const generateSessionApiUrl =
      this.WRAPPER_API_URL + 'auth/v1/token/generate';

    return this.http
      .post<Validate>(generateSessionApiUrl, generateSessionBody)
      .pipe(
        tap((data: Validate) => {
          localStorage.setItem('session-id', data.user.sessionId);
        })
      );
  }

  generateOtp(customerDetails: Customer): Observable<boolean> {
    const url = this.WRAPPER_API_URL + 'auth/v1/otp/generate';

    const payload = {
      brand: 'ABBOTTALLDEMO',
      deviceId: 'ABT123',
      identifierType: 'MOBILE',
      identifierValue: customerDetails.mobileNumber,
      sessionId: localStorage.getItem('session-id'),
    };
    return this.http
      .post(url, payload)
      .pipe(map((data: Validate) => data.status.success));
  }

  validatePassword(customerDetails: Customer): Observable<boolean> {
    const generateSessionBody = {
      brand: 'ABBOTTALLDEMO',
      deviceId: 'ABT123',
      identifierType: 'MOBILE',
      identifierValue: customerDetails.mobileNumber,
      password: customerDetails.password,
      sessionId: localStorage.getItem('session-id'),
    };

    const generateSessionApiUrl =
      this.WRAPPER_API_URL + 'auth/v1/password/validate';

    return this.http
      .post<Validate>(generateSessionApiUrl, generateSessionBody)
      .pipe(
        map((data: Validate) => {
          if (data.status.success) {
            return data.auth.token;
          } else {
            return '';
          }
        }),
        tap((token) => localStorage.setItem('token', token)),
        map((data: string) => {
          return data !== '' ? true : false;
        })
      );
  }

  validateEmail(mobile: string, email: string) {
    const url = `https://abbott-api-uat.capillarytech.com/api/v1/email/validate?email=${email}&mobile=${mobile}`;
    return this.http.get(url, {
      headers: new HttpHeaders({
        'country-code': 'MY',
        language: 'en_US',
        Authorization: '85a4447a3b438fbb6e33e5c0428460d3',
      }),
      observe: 'response',
    });
  }

  validateOtp(mobile: string, otp: string): Observable<Validate> {
    const url = this.WRAPPER_API_URL + 'auth/v1/otp/validate';
    const payload = {
      brand: 'ABBOTTALLDEMO',
      deviceId: 'ABT123',
      identifierType: 'MOBILE',
      identifierValue: mobile,
      sessionId: localStorage.getItem('session-id'),
      otp: otp,
    };
    return this.http
      .post<Validate>(url, payload)
      .pipe(
        tap((data: Validate) =>
          localStorage.setItem('token', data?.auth.token ? data.auth.token : '')
        )
      );
  }

  getCustomerData(
    mlp: boolean,
    gapToUpgradeFor: { enabled: boolean; gapDays: number },
    slabHistory: boolean
  ): Observable<CustomerDetail> {
    let getCustomerUrl =
      this.API_URL + 'mobile/v2/api/customer/get?format=json&user_id=true';
    getCustomerUrl = mlp ? getCustomerUrl + '&mlp=true' : getCustomerUrl;
    getCustomerUrl = gapToUpgradeFor.enabled
      ? getCustomerUrl + '&gap_to_upgrade_for=' + gapToUpgradeFor.gapDays
      : getCustomerUrl;
    getCustomerUrl = slabHistory
      ? getCustomerUrl + '&slab_history=true'
      : getCustomerUrl;

    return this.http.get<CustomerDetail>(getCustomerUrl, {
      headers: this.getHeadersWithAuthToken(),
    });
  }

  getCustomerByEmail(email: string): Observable<Validate> {
    const url =
      this.API_URL + `mobile/v2/api/customer/getbyemail?email=${email}`;
    return this.http.get<Validate>(url, {
      headers: this.getHeadersWithAuthToken(),
    });
  }

  getCustomerByPhone(phone: string): Observable<Validate> {
    const url = this.API_URL + `mobile/v2/api/customer/get/any?phno=${phone}`;
    return this.http.get<Validate>(url, {
      headers: this.getHeadersWithAuthToken(),
    });
  }

  private getHeadersWithAuthToken(): HttpHeaders {
    return new HttpHeaders({
      cap_authorization: localStorage.getItem('token'),
      cap_brand: 'ABBOTTALLDEMO',
      cap_device_id: 'ABT123',
      cap_identifier_type: 'MOBILE',
      cap_identifier_value: localStorage.getItem('mobile-number'),
    });
  }
}
