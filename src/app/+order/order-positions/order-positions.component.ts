import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

import { map, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";

import { CategoriesService } from "@shared/services/categories.service";
import { Position } from "../../+categories/models/position.interface";
import { OrderStateService } from "../services/order-state.service";
import { MaterialUtils } from "@shared/utils/material.utils";

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {
  public positions$: Observable<Position[]>
  constructor(
    private _route: ActivatedRoute,
    private _categoriesService: CategoriesService,
    private _orderStateService: OrderStateService,
  ) {}

  public ngOnInit(): void {
    this.positions$ = this._route.params
      .pipe(
        switchMap((params: Params) => this._categoriesService.getPositionsByCategoryId(params['id'])),
        map((positions: Position[]) => positions.map(p => {
          p.quantity = 1;
          return p;
        }))
      )
  }

  public addToOrder(position: Position): void {
    MaterialUtils.toast(`Добавлено х${position.quantity}`)
    this._orderStateService.add(position);
  }
}
