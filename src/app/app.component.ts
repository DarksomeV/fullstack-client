import {Component, OnInit} from '@angular/core';
import { ExperimentService } from './core/services/experiment.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>\n',
})
export class AppComponent implements OnInit{
  constructor(
    private _experimentService: ExperimentService,
  ) {}


  public ngOnInit() {
    this._experimentService.emitGoogleExperimentUpdate();
  }
}
