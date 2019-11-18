import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: './pages/about/about.module#AboutModule' },
    { path: 'dashboard', component: BaseLayoutComponent, data: { extraParameter: '' } }
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
