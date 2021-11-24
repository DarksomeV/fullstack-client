import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

import { Filter } from "@shared/models/filter.interface";
import { MaterialDatePicker, MaterialUtils } from "@shared/utils/material.utils";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {
  @ViewChild('startDate') public startDateRef: ElementRef;
  @ViewChild('endDate') public endDateRef: ElementRef;

  @Output() public onFilter: EventEmitter<Filter> = new EventEmitter<Filter>();

  public order: number;
  public startDatePicker: MaterialDatePicker;
  public endDatePicker: MaterialDatePicker;
  public isValid: boolean = true;

  public ngOnDestroy(): void {
    this.startDatePicker.destroy();
    this.endDatePicker.destroy();
  }

  public ngAfterViewInit(): void {
    this.startDatePicker = MaterialUtils.initDatePicker(this.startDateRef, this.validate.bind(this))
    this.endDatePicker = MaterialUtils.initDatePicker(this.endDateRef, this.validate.bind(this))
  }

  public validate(): void {
    if (!this.startDatePicker.date || !this.endDatePicker.date) {
      this.isValid = true;
      return;
    }

    this.isValid = this.startDatePicker.date < this.endDatePicker.date;
  }

  public submitFilter(): void {
    const filter: Filter = {};

    if (this.order) {
      filter.order = this.order;
    }

    if (this.startDatePicker.date) {
      filter.start = this.startDatePicker.date;
    }

    if (this.endDatePicker.date) {
      filter.end = this.endDatePicker.date;
    }

    this.onFilter.emit(filter);
  }
}
