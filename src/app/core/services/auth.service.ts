import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '@shared/models/user.interface';
import { LocalStorageService } from './local-storage.service';
import { LoginResponse } from '../models/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService,
  ) {}

  public login(user: User): Observable<LoginResponse> {
    return this._http.post<LoginResponse>('/api/auth/login', user)
      .pipe(
        tap(({token}: LoginResponse) => {
          this._localStorageService.set('auth-token', token);
        }),
      );
  }

  public register(user: User): Observable<User> {
    return this._http.post<User>('/api/auth/register', user)
  }

  public logout() {
    this._localStorageService.remove('auth-token');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public getToken(): string {
    return this._localStorageService.get('auth-token');
  }
}
