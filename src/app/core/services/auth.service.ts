import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '@shared/models/user.interface';
import { LocalStorageService } from './local-storage.service';
import { LoginResponse } from '../models/login-response.interface';

@Injectable()
export class AuthService {
  private _token = null;

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService,
  ) {}

  public login(user: User): Observable<LoginResponse> {
    return this._http.post<LoginResponse>('/api/auth/login', user)
      .pipe(
        tap(({token}: LoginResponse) => {
          this._localStorageService.set('auth-token', token);
          this.setToken(token);
        }),
      );
  }

  public register(user: User): Observable<User> {
    return this._http.post<User>('/api/auth/register', user)
  }

  public logout() {
    this.setToken(null);
    this._localStorageService.remove('auth-token');
  }

  public isAuthenticated(): boolean {
    return !!this._token;
  }

  private setToken(token: string): void {
    this._token = token;
  }

  private getToken(): string {
    return this._token;
  }
}
