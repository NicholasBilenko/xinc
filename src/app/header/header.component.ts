import { Component } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <div class="header">
        <div *ngIf="authService.getUser()" class="user-info">
          <a (click)="unauthorize()" class="lt-icon-logout-image">Logout</a>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}
  
  public unauthorize(): void {
	  this.authService.unauthorize();
    this.router.navigate(['/']);
  }
}
