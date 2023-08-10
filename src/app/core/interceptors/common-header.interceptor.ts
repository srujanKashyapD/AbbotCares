import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CommonHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const clonedReq = request.clone({
      headers: request.headers
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json, text/plain, */*'),
    });

    return next.handle(clonedReq);
  }
}
