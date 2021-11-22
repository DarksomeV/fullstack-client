import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from "@angular/forms";

import { OrderPageComponent } from './order-page/order-page.component';
import { OrderCategoriesComponent } from './order-categories/order-categories.component';
import { OrderPositionsComponent } from './order-positions/order-positions.component';
import { CategoriesService } from "@shared/services/categories.service";
import { LoaderModule } from "@shared/components/loader/loader.module";
import { OrderStateService } from "./services/order-state.service";
import { OrderService } from "@shared/services/order.service";

const routes: Routes = [
  {
    path: '',
    component: OrderPageComponent,
    children: [
      {
        path: '',
        component: OrderCategoriesComponent,
      },
      {
        path: ':id',
        component: OrderPositionsComponent,
      }
    ]
  },
]

@NgModule({
  declarations: [
    OrderPageComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LoaderModule,
    FormsModule
  ],
  providers: [
    CategoriesService,
    OrderStateService,
    OrderService,
  ]
})
export class OrderModule {}
