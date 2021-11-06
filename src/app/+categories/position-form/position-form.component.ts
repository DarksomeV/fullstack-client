import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { BehaviorSubject } from "rxjs";
import { finalize } from "rxjs/operators";

import { CategoriesService } from "../services/categories.service";
import { Position } from "../models/position.interface";
import { MaterialInstance, MaterialUtils } from "@shared/utils/material.utils";
import { Message } from "@shared/models/message.interface";

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef: ElementRef;
  @Input() public categoryId: string;

  public modal: MaterialInstance;
  public positionId: string = null;
  public form: FormGroup;
  public positions: Position[]; // Add form array to form, not like this
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private _categoriesService: CategoriesService,
    private _fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.initObservables()
  }

  public ngAfterViewInit(): void {
    this.modal = MaterialUtils.initModal(this.modalRef);
  }

  public ngOnDestroy(): void {
    this.modal.destroy();
  }

  public onSelectPosition(position: Position): void {
    this.positionId = position._id;
    this.form.patchValue(position);
    MaterialUtils.updateInputs();
    this.modal.open();
  }

  public onAddPosition(): void {
    this.positionId = null;
    this.form.reset();
    this.modal.open();
  }

  public onCancel(): void {
    this.modal.close();
  }

  public onSubmit(): void {
    this.form.disable();

    const position: Position = {
      ...this.form.value,
      category: this.categoryId,
    }

    if (this.positionId) {
      position._id = this.positionId;
      this._categoriesService.updatePosition(position)
        .pipe(
          finalize(() => {
            this.form.enable();
            this.form.reset();
            this.modal.close();
          })
        )
        .subscribe(
          (position: Position) => {
            const idx = this.positions.findIndex(p => p._id === position._id);
            this.positions[idx] = position;

            MaterialUtils.toast('Позиция обновлена');
          },
          ({ error }: HttpErrorResponse) => {
            MaterialUtils.toast(error?.message)
          }
        )
    } else {
      this._categoriesService.createPosition(position)
        .pipe(
          finalize(() => {
            this.form.enable();
            this.form.reset();
            this.modal.close();
          })
        )
        .subscribe(
          (position: Position) => {
            this.positions.push(position)
            MaterialUtils.toast('Позиция создана');
          },
          ({ error }: HttpErrorResponse) => {
            MaterialUtils.toast(error?.message)
          }
        )
    }
  }

  public onDeletePosition(event: Event, position: Position): void {
    event.stopPropagation();
    const decision = window.confirm('Вы уверены что хотите удалить эту позицию?');

    if (decision) {
      this._categoriesService.deletePosition(position._id)
        .subscribe(
          ({ message }: Message) => {
            const idx = this.positions.findIndex(p => p._id === position._id);
            this.positions.splice(idx, 1);
            MaterialUtils.toast(message);
          },
          ({ error }: HttpErrorResponse) => {
            MaterialUtils.toast(error?.message)
          });
    }
  }

  private initForm(): void {
    this.form = this._fb.group({
      name: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(1)]],
    })
  }

  private initObservables(): void {
    this._categoriesService.getPositionsByCategoryId(this.categoryId)
      .pipe(
        finalize(() => this.isLoading$.next(false))
      )
      .subscribe((positions: Position[]) => {
        this.positions = positions;
      });
  }

}
