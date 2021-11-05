import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SiteLayoutComponent } from './core/layouts/site-layout/site-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      }
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: SiteLayoutComponent,
    children: [
      { path: 'overview', loadChildren: () => import('./+overview/overview.module').then(m => m.OverviewModule) },
      { path: 'analytics', loadChildren: () => import('./+analytics/analytics.module').then(m => m.AnalyticsModule) },
      { path: 'history', loadChildren: () => import('./+history/history.module').then(m => m.HistoryModule) },
      { path: 'order', loadChildren: () => import('./+order/order.module').then(m => m.OrderModule) },
      { path: 'categories', loadChildren: () => import('./+categories/categories.module').then(m => m.CategoriesModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
