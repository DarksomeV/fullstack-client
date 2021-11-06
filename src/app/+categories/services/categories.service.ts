import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Category } from '../models/category.interface';
import { Message } from "@shared/models/message.interface";
import { Position } from "../models/position.interface";

@Injectable()
export class CategoriesService {
  constructor(
    private _http: HttpClient,
  ) {}

  public getAllCategories(): Observable<Category[]> {
    return this._http.get<Category[]>('/api/category');
  }

  public getCategoryById(id: string): Observable<Category> {
    return this._http.get<Category>(`/api/category/${id}`);
  }

  public createCategory(name: string, image?: File): Observable<Category> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('name', name)
    return this._http.post<Category>(`/api/category`, fd);
  }

  public updateCategory(id: string, name: string, image?: File): Observable<Category> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('name', name)
    return this._http.patch<Category>(`/api/category/${id}`, fd);
  }

  public deleteCategory(id: string): Observable<Message> {
    return this._http.delete<Message>(`/api/category/${id}`);
  }

  public getPositionsByCategoryId(categoryId: string): Observable<Position[]> {
    return this._http.get<Position[]>(`/api/position/${categoryId}`);
  }

  public createPosition(position: Position): Observable<Position> {
    return this._http.post<Position>(`/api/position`, position);
  }

  public updatePosition(position: Position): Observable<Position> {
    return this._http.patch<Position>(`/api/position/${position._id}`, position);
  }

  public deletePosition(id: string): Observable<Message> {
    return this._http.delete<Message>(`/api/position/${id}`);
  }
}
