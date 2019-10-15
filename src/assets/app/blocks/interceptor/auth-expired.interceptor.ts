import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import {LoginService} from '../../login/login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.loginService.logout().subscribe();
              this.router.navigateByUrl('/login');
            }
          }
        }
      )
    );
  }
}
