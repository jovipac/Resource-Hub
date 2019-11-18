import { Component, HostBinding } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeOptions } from '../../../theme-options';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isActive: boolean;

  constructor(public globals: ThemeOptions) {}

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
}
