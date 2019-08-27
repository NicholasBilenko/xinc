import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private _authService: AuthService;

  constructor(
    private injector: Injector
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.getAuthService().isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.getAuthService().getUser().token
        }
      });
    }
    return next.handle(req).catch(err => this.handleResponseError(err));
  }
  
  private getAuthService(): AuthService {
    if (!this._authService) {
      this._authService = this.injector.get(AuthService);
    }
    return this._authService;
  }

  private handleResponseError(err: any): Observable<any> {
    if (err instanceof HttpErrorResponse) {
      switch (err.status) {
        case 401:
          this.getAuthService().unauthorize();
          break;
      }
    }
    return Observable.throw(err);
  }
}
