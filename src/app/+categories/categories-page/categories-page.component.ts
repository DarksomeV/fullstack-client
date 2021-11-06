import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Category } from '../models/category.interface';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {
  public categories$: Observable<Category[]>;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private _categoriesService: CategoriesService,
  ) {}

  public ngOnInit(): void {
    this.initObservables();
  }

  private initObservables(): void {
    this.categories$ = this._categoriesService.getAllCategories()
      .pipe(
        finalize(() => this.isLoading$.next(false))
      );
  }
}
