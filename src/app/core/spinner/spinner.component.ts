import { ChangeDetectorRef, Component } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner-container" [hidden]="!activated">
      <div class="half-circle-spinner">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  activated: boolean;

  constructor(
    spinnerService: SpinnerService,
    changeDetector: ChangeDetectorRef
  ) {
    spinnerService.activated.subscribe(activated => {
      this.activated = activated;
      setTimeout(() => {
        changeDetector.detectChanges();
      });
    });
  }
}
