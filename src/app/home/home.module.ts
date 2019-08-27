import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { MainResolve } from './home-resolve';
import { HomeService } from './home.service';
import { HeaderModule } from '../header/header.module';
import { AuthGuard } from '../shared/auth.guard';

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		SharedModule,
		HeaderModule,
		RouterModule.forChild([{
			path: 'main',
			pathMatch: 'full',
			component: HomeComponent,
			resolve: {
				data: MainResolve
			},
			canActivate: [AuthGuard]
		}])
	],
	providers: [
		MainResolve,
		HomeService
	]
})
export class HomeModule {}
