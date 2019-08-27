import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-modal-dialog></app-modal-dialog>
    <app-spinner></app-spinner>
  `
})
export class AppComponent {}
