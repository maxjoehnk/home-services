import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { LOAD_PRESENCE, LoadPresenceSuccess, LoadPresenceFailed } from '../actions/presence';

@Injectable()
export class PresenceEffects {

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(LOAD_PRESENCE)
        .mergeMap(() => this.http.get('/_api/presence')
            .map(data => new LoadPresenceSuccess(data.json()))
            .catch(err => of(new LoadPresenceFailed(err)))
        );

    constructor(
        private actions$: Actions,
        private http: Http
    ) { }
}
