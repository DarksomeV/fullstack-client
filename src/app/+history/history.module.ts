import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HistoryPageComponent } from './history-page/history-page.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryPageComponent,
  }
]

@NgModule({
  declarations: [
    HistoryPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HistoryModule {}
