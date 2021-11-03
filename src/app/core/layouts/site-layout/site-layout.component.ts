import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaterialUtils } from '@shared/utils/material.utils';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('floating') floatingRef: ElementRef;

  public links = [
    { url: '/overview', name: 'Обзор' },
    { url: '/analytics', name: 'Аналитика' },
    { url: '/history', name: 'История' },
    { url: '/order', name: 'Добавить заказ' },
    { url: '/categories', name: 'Ассортимент' },
  ];

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    MaterialUtils.initializeFloatingButton(this.floatingRef)
  }

  public logout(event: Event): void {
    event.preventDefault();
    this._authService.logout();
    this._router.navigate(['/login']);
  }

}
