import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  setFakeCookie() {
    var date = new Date();
    date.setTime(date.getTime() + (24*60*60*1000));
    const expires = "; expires=" + date.toUTCString();

    document.cookie = 'experiment' + "=" + ('true')  + expires + "; path=/";
    window['dataLayer'].push({'event': 'optimize.activate'});
  }
}
