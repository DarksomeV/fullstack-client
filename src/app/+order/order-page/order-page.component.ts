import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter } from "rxjs/operators";

import { MaterialInstance, MaterialUtils } from "@shared/utils/material.utils";
import { OrderStateService } from "../services/order-state.service";
import { Order, OrderPosition } from "@shared/models/order.interface";
import { OrderService } from "@shared/services/order.service";

@UntilDestroy()
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') public modalRef: ElementRef;

  public modal: MaterialInstance;
  public isRoot: boolean = true;
  public pending: boolean = false;

  constructor(
    public orderStateService: OrderStateService,
    private _orderService: OrderService,
    private _router: Router,
  ) {}

  public ngOnInit(): void {
    this._router.events
      .pipe(
        filter((e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.isRoot = this._router.url === '/order';
      })
  }

  public ngOnDestroy() {
    this.modal.destroy();
  }

  public ngAfterViewInit(): void {
    this.modal = MaterialUtils.initModal(this.modalRef);
  }

  public openModal(): void {
    this.modal.open();
  }

  public cancel(): void {
    this.modal.close();
  }

  public submit(): void {
    this.pending = true;
    const order: Order = {
      list: this.orderStateService.list.map(item => {
        delete item._id;
        return item;
      }),

    }

    this._orderService.create(order)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((orderRes: Order) => {
          MaterialUtils.toast(`Заказ #${orderRes.order} был добавлен.`);
          this.orderStateService.clear();
        },
        ({error}: HttpErrorResponse) => {
          MaterialUtils.toast(error?.message)
        },
        () => {
          this.modal.close();
          this.pending = false;
        });
  }

  public removePosition(position: OrderPosition): void {
    this.orderStateService.remove(position);
  }
}
