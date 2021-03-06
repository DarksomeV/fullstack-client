import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsPageComponent,
  }
]

@NgModule({
  declarations: [
    AnalyticsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AnalyticsModule {}
