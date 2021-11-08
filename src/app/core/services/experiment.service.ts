import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ExperimentService {
  private _isGoogleExperiment$: BehaviorSubject<any> = new BehaviorSubject<any>(false)

  public isGoogleExperimentObservable(): Observable<boolean> {
    return this._isGoogleExperiment$.asObservable();
  }

  public emitGoogleExperimentUpdate(): void {
    window['dataLayer'].push({'event': 'optimize.activate'});
    this._isGoogleExperiment$.next(!!(window['google_optimize'].get('BDwjFXXxTjOA0H2xk_FHCA')))
  }
}
