import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';
import { SecuredStorageService } from './storage/secured-storage.service';
import { UtilService} from './util/util.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { ModalDialogComponent } from './modal/dialog/modal-dialog.component';
import { ModalDialogService } from './modal/dialog/modal-dialog.service';

@NgModule({
  imports: [
	  FormsModule,
	  ReactiveFormsModule,
    HttpClientModule,
	  CommonModule
  ],
  providers: [
	  AuthService,
    UtilService,
	  SpinnerService,
	  ModalDialogService,
    SecuredStorageService,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
    }
  ],
  declarations: [
	  SpinnerComponent,
	  ModalDialogComponent
  ],
  exports: [
	  SpinnerComponent,
	  ModalDialogComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import Core modules in the AppModule only.');
    }
  }
}