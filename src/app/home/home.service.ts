import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class HomeService {
	constructor(
		private httpClient: HttpClient
	) {}
	
	public getCounter(): Observable<any> {
		return this.httpClient.get<any>(environment.api.counter.url);
	}
	
	public increment(): Observable<any> {
		return this.httpClient.post<any>(environment.api.counter.url, {});
	}
}