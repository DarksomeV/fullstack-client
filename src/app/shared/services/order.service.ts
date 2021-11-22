import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Order } from "@shared/models/order.interface";
import { environment } from "../../../environments/environment";

@Injectable()
export class OrderService {
  baseUrl: string = environment.baseURL;

  constructor(
    private _http: HttpClient,
  ) {}

  public create(order: Order): Observable<Order> {
    return this._http.post<Order>(this.baseUrl + '/api/order', order)
  }
}
