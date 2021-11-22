import { Injectable } from '@angular/core';

import { Position } from "../../+categories/models/position.interface";
import { OrderPosition } from "@shared/models/order.interface";

@Injectable()
export class OrderStateService {
  public list: OrderPosition[] = [];
  public price = 0;

  public add({ name, cost, quantity, _id }: Position): void {
    const orderPosition: OrderPosition = { name, cost, quantity, _id };
    const candidate = this.list.find(p => p._id === _id);

    if (candidate) {
      candidate.quantity += quantity;
    } else {
      this.list.push(orderPosition)
    }

    this.computePrice();
  }

  public remove(orderPosition: OrderPosition): void {
    const idx = this.list.findIndex(p => p._id === orderPosition._id);

    this.list.splice(idx, 1);

    this.computePrice();
  }

  public clear(): void {
    this.list = [];
    this.price = 0;
  }

  private computePrice(): void {
    this.price = this.list.reduce((acc, curr) => {
      return acc + curr.quantity * curr.cost;
    }, 0)
  }
}
