import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './shared/auth.guard';
import { AppComponent } from './app.component';
import { Ng2Webstorage } from 'ngx-webstorage';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
	  CoreModule,
    BrowserModule,
	  Ng2Webstorage.forRoot({
		  prefix: 'app',
		  separator: '-'
	  }),
    RouterModule.forRoot([{
	    path: '',
	    pathMatch: 'full',
	    component: AppComponent,
	    canActivate: [AuthGuard]
    }]),
	  LoginModule,
	  HomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
