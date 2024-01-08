import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

Injectable({
  providedIn: 'root',
});

export class TokenInterceptor implements HttpInterceptor {
  ls = localStorage.getItem('user');
  t = this.ls ? JSON.parse(this.ls) : null;
  token = this.t?.ac;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(this.token);

    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return next.handle(request);
  }
}
