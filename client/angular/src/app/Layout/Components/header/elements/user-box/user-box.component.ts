import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '../../../../../theme-options';
import { Router } from '@angular/router';

import { AuthenticationService, CredentialsService, I18nService } from '@app/core';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html'
})
export class UserBoxComponent implements OnInit {
  constructor(
    public globals: ThemeOptions,
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {}

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }
}
