import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HistoryPageComponent } from './history-page/history-page.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { HistoryFilterComponent } from './history-filter/history-filter.component';
import { OrderService } from "@shared/services/order.service";
import { LoaderModule } from "@shared/components/loader/loader.module";

const routes: Routes = [
  {
    path: '',
    component: HistoryPageComponent,
  }
]

@NgModule({
  declarations: [
    HistoryPageComponent,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LoaderModule
  ],
  providers: [
    OrderService
  ]
})
export class HistoryModule {}
