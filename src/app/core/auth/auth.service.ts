import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SecuredStorageService } from '../storage/secured-storage.service';
import { UtilService } from '../util/util.service';
import { User } from './auth.model';

@Injectable()
export class AuthService {
  private user: User;
  private readonly userKey: string = 'principal';
  private readonly userSecret: string = 'uS3r-s3CR3t';

  constructor(
    private http: HttpClient,
    private storage: SecuredStorageService
  ) {
    this.user = this.storage.retrieve(this.userKey, this.userSecret);
  }
	
	public isAuthenticated(): boolean {
    return UtilService.isObject(this.user) && !!this.user.token;
  }

  public login(data): Observable<User> {
    return this.http
      .post<HttpResponse<any>>(environment.api.auth.login.url, data, { observe: 'response' })
      .map<HttpResponse<any>, User>((response: HttpResponse<any>) => {
        const token = response.headers.get('Authorization');
        if (token) {
          return new User(token);
        }
        throw {
          error: 'Could not extract auth token'
        };
      })
      .do<User>((user: User) => {
        this.authorize(user);
      })
      .catch((httpError: HttpErrorResponse) => {
        return Observable.throw(httpError.error);
      });
  }
	
	public unauthorize() {
		this.setUser(null);
	}
	
  public getUser(): User {
    return this.user;
  }

  private authorize(user: User) {
    this.setUser(user);
  }

  private setUser(user: User): void {
    this.user = user;
    if (user) {
      this.storage.store(this.userKey, user, this.userSecret);
    } else {
      this.storage.clear(this.userKey);
    }
  }
}
