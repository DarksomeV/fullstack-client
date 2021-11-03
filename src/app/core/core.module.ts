import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    SiteLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    AuthService,
    LocalStorageService,
  ],
  exports: [
    AuthLayoutComponent,
    SiteLayoutComponent
  ]
})
export class CoreModule { }
