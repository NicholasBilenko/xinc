import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { SpinnerService } from '../core/spinner/spinner.service';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/finally';

@Injectable()
export class MainResolve implements Resolve<any> {
  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private homeService: HomeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.homeService
        .getCounter()
        .finally(() => this.spinner.stop())
        .catch(error => {
            this.router.navigate(['/']);
            return Observable.throwError(error.statusText);
        });
  }
}