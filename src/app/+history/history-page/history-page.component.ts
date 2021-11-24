import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { MaterialInstance, MaterialUtils } from "@shared/utils/material.utils";
import { OrderService } from "@shared/services/order.service";
import { Order } from "@shared/models/order.interface";

const STEP = 2;

@UntilDestroy()
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip') public tooltipRef: ElementRef;

  public tooltip: MaterialInstance;
  public isFilterVisible: boolean = false;
  public loadingMore: boolean = false;
  public reloading: boolean = true;
  public offset: number = 0;
  public limit: number = STEP;
  public orderList: Order[] = [];
  public noMoreOrders = false;

  constructor(
    private _orderService: OrderService,
  ) {}

  public ngOnInit(): void {
    this.getOrderList();
  }

  public ngOnDestroy(): void {
    this.tooltip.destroy();
  }

  public ngAfterViewInit(): void {
    this.tooltip = MaterialUtils.initTooltip(this.tooltipRef)
  }

  public loadMore(): void {
    this.offset += STEP;
    this.loadingMore = true;
    this.getOrderList();
  }

  private getOrderList(): void {
    const params = {
      offset: this.offset,
      limit: this.limit,
    };

    this._orderService.getAll(params)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((orders: Order[]) => {
          this.orderList.push(...orders);
          this.noMoreOrders = orders.length < STEP;
        },
        null,
        () => {
          this.loadingMore = false;
          this.reloading = false;
        })
  }
}
