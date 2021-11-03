import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthService } from '../core/services/auth.service';
import { MaterialUtils } from '@shared/utils/material.utils';
import { HttpErrorResponse } from '@angular/common/http';

@UntilDestroy()
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initSubscriptions();
  }

  public onSubmit(): void {
    this.form.disable();

    this._authService.login(this.form.value)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe(
      () => {
        this._router.navigate(['/overview'])
      },
      ({ error }: HttpErrorResponse) => {
        MaterialUtils.toast(error?.message);
        this.form.enable()
      });
  }

  private initForm(): void {
    this.form = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
    })
  }

  private initSubscriptions(): void {
    this._route.queryParams
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((params: Params) => {
      if (params['registered']) {
        MaterialUtils.toast('Теперь можно зайти в систему используя свои данные');
      } else if (params['accessDenied']) {
        MaterialUtils.toast('Для начала авторизируйтесь');
      } else if (params['sessionFailed']) {
        MaterialUtils.toast('Войдите в систему заново');
      }
    })
  }
}
