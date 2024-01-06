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
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1peGlhIiwiaWF0IjoxNzA0MzA2NjIyfQ.UMXspV46A-EBxI0lb3zF3tRC1kPby7BND7x68qvjQm4';
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return next.handle(request);
  }
}
