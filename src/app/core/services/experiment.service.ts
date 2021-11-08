import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ExperimentService {
  private _isGoogleExperiment$: BehaviorSubject<any> = new BehaviorSubject<any>(false)

  public isGoogleExperimentObservable(): Observable<boolean> {
    return this._isGoogleExperiment$.asObservable().pipe(
      tap(() => {
        console.log('dataLayer:', window['dataLayer']);
        console.log('dataLayer:', window['google_optimize'].get('aF0qZgjrRAO4vuvv1nW1GA'));
      })
    );
  }

  public emitGoogleExperimentUpdate(): void {
    window['dataLayer'].push({'event': 'optimize.activate'});
    this._isGoogleExperiment$.next(!!(window['google_optimize'].get('aF0qZgjrRAO4vuvv1nW1GA')))
  }
}
