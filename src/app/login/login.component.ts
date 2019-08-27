import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SpinnerService } from '../core/spinner/spinner.service';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-container__form">
        <form [formGroup]="authForm" (submit)="auth()">
          <input formControlName="username" type="text" placeholder="Username">
          <input formControlName="password" type="password" placeholder="Password">

          <span *ngIf="result && !result.success" class="error-message">Authentication failed</span>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
	public authForm: FormGroup;
	public result;
	
  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private authService: AuthService
  ) { }

  ngOnInit() {
	  this.buildMainForm();
  }
	
	private buildMainForm(): void {
		this.authForm = new FormGroup({
			username: new FormControl('nicholas.bilenko@gamil.com', Validators.required),
			password: new FormControl('123', Validators.required)
		});
	}
	
	auth() {
  	if (!this.authForm.invalid) {
		  this.spinner.start();
		  this.authService
		    .login(this.authForm.value)
		    .finally(() => this.spinner.stop())
		    .subscribe(
			    user => {
			    	if (user) {
					    this.router.navigate(['/main']);
				    }
			    },
			    error => {
				    console.error('Login error occurred: %o', error);
			    }
		    );
	  }
  }
}
