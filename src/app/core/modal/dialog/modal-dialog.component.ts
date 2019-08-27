import { Component, OnInit } from '@angular/core';
import { SubscriptionHelperComponent } from '../../../shared/helpers/subscription-helper.component';
import { ModalDialog, ModalDialogAction } from './modal-dialog.model';
import { ModalDialogService } from './modal-dialog.service';
import { UtilService } from '../../util/util.service';

@Component({
  selector: 'app-modal-dialog',
  template: `
    <div [ngClass]="getStyleClass('modal-dialog')" *ngIf="model">
      <div [ngClass]="getStyleClass('modal-dialog-content')">
        <img *ngIf="model.imgUrl" [src]="model.imgUrl">
        <div [ngClass]="getStyleClass('modal-dialog-info')">
          <h3>{{model.header}}</h3>
          <p [innerHtml]="model.content"></p>
          <div class="button-area">
            <a *ngFor="let action of model.actions"
               (click)="executeAction(action)"
               [ngClass]="{'active-button': action.main, 'inactive-button': !action.main}">
              {{action.titleKey}}
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent extends SubscriptionHelperComponent implements OnInit {
  public model: ModalDialog;

  constructor(private modalDialogService: ModalDialogService) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.modalDialogService.onStateChanged((dialog: ModalDialog) => {
        this.model = dialog;
      })
    );
  }
  
  public executeAction(action: ModalDialogAction): void {
    action.callback();
  }
	
	public getStyleClass(defaultClass: string): string {
    let overriddenClass;
    if (UtilService.isObject(this.model.styleClasses)) {
      overriddenClass = this.model.styleClasses[defaultClass];
    }
    return overriddenClass || defaultClass;
  }
}
