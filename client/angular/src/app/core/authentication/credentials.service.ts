import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Session } from './models/session';
import { Credential } from './models/credential';
import { Storage } from '@capacitor/core';
import { Logger } from '@app/core/logger.service';

const log = new Logger('Prescription');

const authCredentialsKey = 'credentials';
const userCredentialsKey = 'authUser';
/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  user_auth: Session | null = null;
  private _credentials: Credential | null = null;
  private _session = new BehaviorSubject<Session>(null);

  constructor() {
    const savedCredentials = sessionStorage.getItem(authCredentialsKey) || localStorage.getItem(authCredentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  async getCredentials(): Promise<any> {
    const savedCredentials = await Storage.get({ key: authCredentialsKey });

    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials.value);

      const parsedData = JSON.parse(savedCredentials.value) as {
        token: string;
        refresh_token: string;
        tokenExpirationDate: string;
        userId: string;
        name: string;
        username: string;
      };
      const expirationTime = new Date(parsedData.tokenExpirationDate);
      if (expirationTime <= new Date()) {
        return null;
      }
      const user_session = new Session(
        parsedData.userId,
        parsedData.name,
        parsedData.username,
        parsedData.token,
        parsedData.refresh_token,
        expirationTime
      );
      if (user_session) {
        this._session.next(user_session);
      }
    }
  }

  /**
   * Checks is the Session is authenticated.
   * @return True if the Session is authenticated.
   */
  get userIsAuthenticated() {
    return this._session.asObservable().pipe(
      map(session => {
        if (session) {
          return !!session.token;
        } else {
          return false;
        }
      })
    );
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credential | null {
    return this._credentials;
  }
  get authCredentialsKey() {
    return authCredentialsKey;
  }
  get userCredentialsKey() {
    return userCredentialsKey;
  }

  /**
   * Setter the Session credentials.
   * @return The Session credentials or null if the Session is not authenticated.
   */
  get changeAuthInfo() {
    return this._session;
  }

  get userId() {
    return this._session.asObservable().pipe(
      map(session => {
        if (session) {
          return session.id;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._session.asObservable().pipe(
      map(session => {
        if (session) {
          return session.token;
        } else {
          return null;
        }
      })
    );
  }

  get userInfo() {
    return this._session.asObservable().pipe(
      tap(session => log.debug('Data' + session.token)),
      map(session => {
        return session;
      })
    );
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember_me True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credential, remember_me?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const expirationTime = new Date(new Date().getTime() + +credentials.expires_in * 1000);
      this.user_auth = new Session(
        null,
        null,
        null,
        credentials.access_token,
        credentials.refresh_token,
        expirationTime
      );
      this._session.next(this.user_auth);
      this.storeAuthData(
        null,
        null,
        credentials.access_token,
        credentials.refresh_token,
        expirationTime.toISOString(),
        +credentials.expires_in,
        null,
        remember_me
      );
    } else {
      this._session.next(null);
      this.removeAuthData();
    }
  }

  private storeAuthData(
    userId: string,
    name: string,
    access_token: string,
    refresh_token: string,
    tokenExpirationDate: string,
    expires_in: number,
    username: string,
    remember_me: boolean
  ) {
    const data = JSON.stringify({
      userId,
      name,
      access_token,
      refresh_token,
      tokenExpirationDate,
      expires_in,
      username,
      remember_me
    });
    Storage.set({ key: authCredentialsKey, value: data });
  }

  private storeUserData(userId: string, username: string, name: string, firstname: string, lastname: string) {
    const data = JSON.stringify({
      userId,
      username,
      name,
      firstname,
      lastname
    });
    Storage.set({ key: userCredentialsKey, value: data });
  }

  private removeAuthData() {
    Storage.remove({ key: authCredentialsKey });
  }
  private removeUserData() {
    Storage.remove({ key: userCredentialsKey });
  }
}
