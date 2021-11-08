import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {
  googleExperiments;

  constructor() {}

  ngOnInit(): void {
    this.googleExperiments = Number(window['google_optimize'].get('BDwjFXXxTjOA0H2xk_FHCA'));
    console.log(this.googleExperiments)
    console.log(window['google_optimize'])
    console.log(window['google_optimize'].get('gTcMDIWdSV6XAa1tm_qE6g'))
  }

  updateEperimentVariant() {
    this.googleExperiments = Number(window['google_optimize'].get('BDwjFXXxTjOA0H2xk_FHCA'));
    console.log(this.googleExperiments)
    console.log(window['google_optimize'])
    console.log(window['google_optimize'].get('gTcMDIWdSV6XAa1tm_qE6g'))
  }

  setFakeCookie() {
    var date = new Date();
    date.setTime(date.getTime() + (24*60*60*1000));
    const expires = "; expires=" + date.toUTCString();

    document.cookie = 'experiment' + "=" + ('true')  + expires + "; path=/";
    window['dataLayer'].push({'event': 'optimize.activate'});
  }
}
