import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';

import { Logger } from '../logger.service';
import { AuthenticationService } from './authentication.service';
import { CredentialsService } from './credentials.service';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
    private authenticationService: AuthenticationService
  ) {}
  /*
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return true;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
*/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.credentialsService.userIsAuthenticated.pipe(
      take(1),
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          return this.authenticationService.autoLogin();
        } else {
          return of(isAuthenticated);
        }
      }),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          log.debug('No estas autorizado a ver esta pagina');
          this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
        }
      })
    );
  }
}
