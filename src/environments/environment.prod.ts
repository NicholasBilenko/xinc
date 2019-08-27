import { AppConfig } from '../app/app.model';

export const environment: AppConfig = {
	api: {
		auth: {
			login: {
				url: 'api/user/login'
			}
		},
		counter: {
			url: 'api/counter'
		}
	},
  production: true
};
