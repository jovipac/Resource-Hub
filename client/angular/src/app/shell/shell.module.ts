import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ConfigActions } from './../ThemeOptions/store/config.actions';
// BOOTSTRAP COMPONENTS
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ShellComponent } from './shell.component';
import { AvatarModule } from 'ngx-avatar';
// LAYOUT
import { BaseLayoutComponent } from '../Layout/base-layout/base-layout.component';
import { PageTitleComponent } from '../Layout/Components/page-title/page-title.component';
// HEADER
import { HeaderComponent } from '../Layout/Components/header/header.component';
import { SearchBoxComponent } from '../Layout/Components/header/elements/search-box/search-box.component';
import { UserBoxComponent } from '../Layout/Components/header/elements/user-box/user-box.component';
// SIDEBAR
import { SidebarComponent } from '../Layout/Components/sidebar/sidebar.component';
import { LogoComponent } from '../Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER
import { FooterComponent } from '../Layout/Components/footer/footer.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    LoadingBarRouterModule,
    // Angular Bootstrap Components
    PerfectScrollbarModule,
    NgbModule,
    AngularFontAwesomeModule,
    AvatarModule
  ],
  declarations: [
    // LAYOUT
    BaseLayoutComponent,
    PageTitleComponent,
    // HEADER
    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,
    // SIDEBAR
    SidebarComponent,
    LogoComponent,
    // FOOTER
    FooterComponent,
    ShellComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      // DEFAULT_DROPZONE_CONFIG,
    },
    ConfigActions
  ]
})
export class ShellModule {}
