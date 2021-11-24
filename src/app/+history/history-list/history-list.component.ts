import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';

import { Order } from "@shared/models/order.interface";
import { MaterialInstance, MaterialUtils } from "@shared/utils/material.utils";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @ViewChild('modal') public modalRef: ElementRef;
  @Input() public orders: Order[];

  public modal: MaterialInstance;
  public selectedOrder: Order;

  constructor() { }

  public ngOnDestroy(): void {
    this.modal.destroy();
  }

  public ngAfterViewInit(): void {
    this.modal = MaterialUtils.initModal(this.modalRef);
  }

  public selectOrder(order: Order): void {
    this.modal.open();
    this.selectedOrder = order;
  }

  public closeModal(): void {
    this.selectedOrder = null;
    this.modal.close();
  }
}
