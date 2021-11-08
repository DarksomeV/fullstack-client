import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Category } from '../models/category.interface';
import { CategoriesService } from '../services/categories.service';
import { ExperimentService } from '../../core/services/experiment.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {
  public categories$: Observable<Category[]>;
  public isExperiment$: Observable<boolean>;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private _categoriesService: CategoriesService,
    private _experimentService: ExperimentService,
  ) {}

  public ngOnInit(): void {
    this.initObservables();
  }

  joinExperiment() {
    var date = new Date();
    date.setTime(date.getTime() + (24*60*60*1000));
    const expires = "; expires=" + date.toUTCString();

    document.cookie = 'hatsk' + "=" + ('true')  + expires + "; path=/";
    this._experimentService.emitGoogleExperimentUpdate();
  }

  private initObservables(): void {
    this.isExperiment$ = this._experimentService.isGoogleExperimentObservable();
    this.categories$ = this._categoriesService.getAllCategories()
      .pipe(
        finalize(() => this.isLoading$.next(false))
      );
  }
}
