import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { LOAD_CARDS, LoadCardsSuccess, LoadCardsFailed } from '../actions/stream';

@Injectable()
export class StreamEffects {

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(LOAD_CARDS)
        .mergeMap(() => this.http.get('/_api/stream')
            .map(data => new LoadCardsSuccess(data.json()))
            .catch(err => of(new LoadCardsFailed(err)))
        );

    constructor(
        private actions$: Actions,
        private http: Http
    ) { }
}
