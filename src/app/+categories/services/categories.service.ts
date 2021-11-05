import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Category } from '../models/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    private _http: HttpClient,
  ) {}

  public getAllCategories(): Observable<Category[]> {
    return this._http.get<Category[]>('/api/category');
  }
}
