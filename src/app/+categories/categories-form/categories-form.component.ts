import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import { switchMap, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { CategoriesService } from "../services/categories.service";
import { Category } from "../models/category.interface";
import { MaterialUtils } from "@shared/utils/material.utils";
import { Message } from "@shared/models/message.interface";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('input') public imageInput: ElementRef;
  public image: File;
  public imagePreview: any;
  public isNew = true;
  public form: FormGroup;
  public category: Category;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoriesService: CategoriesService,
    private _fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.initForm();

    this.form.disable();

    this._route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {

            this.isNew = false;

            return this._categoriesService.getCategoryById(params['id'])
          }

          return of(null)
        })
      )
      .subscribe(
        (cat: Category) => {
          if (cat) {
            this.category = cat;
            this.form.patchValue(cat)
            MaterialUtils.updateInputs();
            this.imagePreview = cat.imageSrc;
          }
          this.form.enable()
        },
        ({error}: HttpErrorResponse) => {
          MaterialUtils.toast(error?.message)
        },
      )
  }

  public triggerClick(): void {
    this.imageInput.nativeElement.click()
  }

  public fileUpload(event: any): void {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }

  public onSubmit(): void {
    let obs$: Observable<Category>;
    this.form.disable();

    if (this.isNew) {
      obs$ = this._categoriesService.createCategory(this.form.value['name'], this.image).pipe(
        tap((cat: Category) => {
          this._router.navigate(['../categories', cat._id])
        })
      )
    } else {
      obs$ = this._categoriesService.updateCategory(this.category._id, this.form.value['name'], this.image)
    }

    obs$.subscribe(
      (cat: Category) => {
        this.category = cat;
        MaterialUtils.toast('Изменения сохранены');
        this.form.enable();
      },
      ({error}: HttpErrorResponse) => {
        MaterialUtils.toast(error?.message);
        this.form.enable();
      })
  }

  public deleteCategory(): void {
    const decision = window.confirm('Вы уверены что хотите удалить категорию?');

    if (decision) {
      this._categoriesService.deleteCategory(this.category._id)
        .subscribe(
          ({ message }: Message) => {
            MaterialUtils.toast(message);
          },
          ({ error }: HttpErrorResponse) => {
            MaterialUtils.toast(error?.message)
          },
          () => {
            this._router.navigate(['/categories'])
          });
    }
  }

  private initForm(): void {
    this.form = this._fb.group({
      name: ['', Validators.required]
    })
  }

}
