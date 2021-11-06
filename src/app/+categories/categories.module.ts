import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoriesService } from './services/categories.service';
import { LoaderModule } from '@shared/components/loader/loader.module';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { PositionFormComponent } from './position-form/position-form.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPageComponent,
  },
  {
    path: 'new',
    component: CategoriesFormComponent,
  },
  {
    path: ':id',
    component: CategoriesFormComponent,
  }
]

@NgModule({
  declarations: [
    CategoriesPageComponent,
    CategoriesFormComponent,
    PositionFormComponent,
  ],
  imports: [
    CommonModule,
    LoaderModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  providers: [
    CategoriesService
  ]
})
export class CategoriesModule {}
