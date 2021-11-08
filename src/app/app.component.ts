import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>\n',
})
export class AppComponent implements OnInit{
  constructor() {
  }
  public ngOnInit() {}
}
