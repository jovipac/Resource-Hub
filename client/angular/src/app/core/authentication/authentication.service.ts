import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take, tap } from 'rxjs/operators';
import { Storage } from '@capacitor/core';

import { environment } from '../../../environments/environment';
import { CredentialsService } from './credentials.service';
import { Credential } from './models/credential';
import { Session } from './models/session';

export interface LoginContext {
  username: string;
  password: string;
  remember_me?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
  private activeLogoutTimer: any;
  constructor(private http: HttpClient, private credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credential> {
    // Replace by proper authentication call
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'false',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    return this.http
      .post<Credential>(
        `/oauth/token`,
        {
          client_id: 2,
          client_secret: environment.client_secret,
          redirect_uri: 'http://localhost',
          grant_type: 'password',
          username: context.username,
          password: context.password,
          scope: '*'
        },
        { headers }
      )
      .pipe(
        take(1),
        tap(credentials => {
          this.credentialsService.setCredentials(credentials, context.remember_me);
          this.autoLogout(this.credentialsService.user_auth.tokenDuration);
        })
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }

  autoLogin() {
    return from(Storage.get({ key: this.credentialsService.authCredentialsKey })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        let parsedData = JSON.parse(storedData.value);
        this.credentialsService.setCredentials(parsedData);

        parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          username: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const session = new Session(
          parsedData.id,
          parsedData.name,
          parsedData.username,
          parsedData.access_token,
          parsedData.refresh_token,
          expirationTime
        );
        return session;
      }),
      tap(session => {
        if (session) {
          this.credentialsService.changeAuthInfo.next(session);
          this.autoLogout(session.tokenDuration);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
}
