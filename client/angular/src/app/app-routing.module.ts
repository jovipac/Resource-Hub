import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: './pages/about/about.module#AboutModule' },
    {
      path: '',
      component: PagesLayoutComponent,
      data: { extraParameter: '' },
      children: [
        // User Pages
      ]
    }
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
