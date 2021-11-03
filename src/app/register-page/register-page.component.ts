import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthService } from '../core/services/auth.service';
import { User } from '@shared/models/user.interface';

@UntilDestroy()
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(): void {
    this.form.disable();

    this._authService.register(this.form.value)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe(
        (user: User) => {
          this._router.navigate(['/login'], {
            queryParams: {
              registered: true,
            }
          })
        },
        (error) => {
          this.form.enable()
        });
  }

  private initForm(): void {
    this.form = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
    })
  }
}
