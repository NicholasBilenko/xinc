import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDialogService } from '../core/modal/dialog/modal-dialog.service';
import { ModalDialogAction } from '../core/modal/dialog/modal-dialog.model';
import { HomeService } from './home.service';
import { SpinnerService } from '../core/spinner/spinner.service';
import { ICounter } from '../shared/counter.model';
import 'rxjs/add/operator/finally';

interface ICounterData {
	data: ICounter;
}

@Component({
  selector: 'app-home',
  template: `
    <app-header></app-header>
    <div *ngIf='counter' class='home'>
      <span>«Count: {{counter.counter}}»</span>
      <button (click)='increment()'>(Increment)</button>
    </div>
  `,
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public counter: ICounter;
  constructor(
	  private activatedRoute: ActivatedRoute,
	  private modalDialogService: ModalDialogService,
	  private homeService: HomeService,
	  private spinner: SpinnerService
  ) {}
  
  ngOnInit(): void {
	  this.activatedRoute.data.subscribe((counter: ICounterData) => {
	    this.counter = counter.data;
	  });
  }
  
  public increment(): void {
	  this.homeService
		  .getCounter()
		  .finally(() => this.spinner.stop())
		  .subscribe(
			  data => {
				  if (data) {
					  this.showModal(data);
				  }
			  },
			  error => {
				  console.error('increment error: ', error);
			  }
		  );
  }
  
  private showModal(data) {
	  this.modalDialogService.open({
		  header: 'Increment',
		  content: `
				<div>current count - ${data.counter}</div>
				<div>next count - ${data.nextCounter}</div>
			`,
		  actions: [
			  new ModalDialogAction(
				  'cancel',
				  () => this.modalDialogService.close(),
				  true
			  ),
			  new ModalDialogAction(
				  'confirm',
				  () => {
					  this.homeService
					  .increment()
					  .finally(() => this.spinner.stop())
					  .subscribe(
						  counter => {
							  if (counter) {
								  this.counter = counter;
								  this.modalDialogService.close();
							  }
						  },
						  error => {
							  console.error('Login error occurred: %o', error);
						  }
					  );
				  }
			  )
		  ],
		  styleClasses: {
			  'modal-dialog': 'modal-dialog',
			  'modal-dialog-content': 'modal-dialog-content',
			  'modal-dialog-info': 'modal-dialog-info'
		  }
	  });
  }
}
