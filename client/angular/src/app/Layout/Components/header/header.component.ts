import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, CredentialsService, I18nService } from '@app/core';
import { ThemeOptions } from '../../../theme-options';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isActive: boolean;
  menuHidden = true;

  constructor(
    public globals: ThemeOptions,
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {}

  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.token_type : null;
  }
}
