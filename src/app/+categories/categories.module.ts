import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesPageComponent } from './categories-page/categories-page.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPageComponent,
  }
]

@NgModule({
  declarations: [
    CategoriesPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoriesModule {}
