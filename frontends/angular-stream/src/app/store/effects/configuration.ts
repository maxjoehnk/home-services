import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { LOAD_CONFIGURATION, LoadConfigurationSuccess, LoadConfigurationFailed } from '../actions/configuration';

@Injectable()
export class ConfigurationEffects {

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(LOAD_CONFIGURATION)
        .mergeMap(() => this.http.get('/_api/configuration')
            .map(data => new LoadConfigurationSuccess(data.json()))
            .catch(err => of(new LoadConfigurationFailed(err)))
        );

    constructor(
        private actions$: Actions,
        private http: Http
    ) { }
}
