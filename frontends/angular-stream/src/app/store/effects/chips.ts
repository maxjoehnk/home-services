import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { LOAD_CHIPS, LoadChipsSuccess, LoadChipsFailed } from '../actions/chips';

@Injectable()
export class ChipEffects {

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(LOAD_CHIPS)
        .mergeMap(() => this.http.get('/_api/chips')
            .map(data => new LoadChipsSuccess(data.json()))
            .catch(err => of(new LoadChipsFailed(err)))
        );

    constructor(
        private actions$: Actions,
        private http: Http
    ) { }
}
