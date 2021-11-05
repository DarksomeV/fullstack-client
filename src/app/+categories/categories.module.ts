import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoriesService } from './services/categories.service';
import { LoaderModule } from '@shared/components/loader/loader.module';

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
    LoaderModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CategoriesService
  ]
})
export class CategoriesModule {}
