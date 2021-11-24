import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Order } from "@shared/models/order.interface";
import { environment } from "../../../environments/environment";

@Injectable()
export class OrderService {
  baseUrl: string = environment.baseURL;

  constructor(
    private _http: HttpClient,
  ) {
  }

  public getAll(params: any = {}): Observable<Order[]> {
    return this._http.get<Order[]>(this.baseUrl + '/api/order', {
      params: new HttpParams({
        fromObject: params,
      }),
    })
      .pipe(
        map((orders: Order[]) => orders.map(o => {
          o.totalPrice = o.list.reduce((acc, curr) => {
            return acc += curr.quantity * curr.cost;
          }, 0);

          return o;
        }))
      )
  }

  public create(order: Order): Observable<Order> {
    return this._http.post<Order>(this.baseUrl + '/api/order', order)
  }
}
