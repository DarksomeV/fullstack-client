import { Component, OnInit } from '@angular/core';
import { CategoriesService } from "@shared/services/categories.service";
import { Observable } from "rxjs";
import { Category } from "../../+categories/models/category.interface";

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {
  public categories$: Observable<Category[]>;

  constructor(
    private _categoriesService: CategoriesService,
  ) {}

  public ngOnInit(): void {
    this.initObservables();
  }

  private initObservables(): void {
    this.categories$ = this._categoriesService.getAllCategories();
  }

}
