import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { HeaderModule } from '../header/header.module';

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		SharedModule,
		HeaderModule,
		RouterModule.forChild([{
			path: 'login',
			component: LoginComponent
		}]),
	]
})
export class LoginModule {}
