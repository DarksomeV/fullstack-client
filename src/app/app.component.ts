import {Component, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
declare var ga: Function;

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>\n',
})
export class AppComponent implements OnInit{
  constructor(private _router: Router) {
  }
  public ngOnInit() {
    console.log(window['dataLayer']);
    window['dataLayer'].push({'event': 'optimize.activate'});
    this._router.events
      .pipe(
        filter(event  => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
      ga('set', 'page', event.urlAfterRedirects);
      ga('send', 'pageview')
    });
  }
}
