import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OrderPageComponent } from './order-page/order-page.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPageComponent,
  }
]

@NgModule({
  declarations: [
    OrderPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderModule {}
