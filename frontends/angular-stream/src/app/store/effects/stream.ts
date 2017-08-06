import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { LOAD_CARDS, LoadCardsSuccess } from '../actions/stream';
import { stream } from '../stubs';

@Injectable()
export class StreamEffects {

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(LOAD_CARDS)
        .map(() => new LoadCardsSuccess(stream));

    constructor(
        private actions$: Actions
    ) { }
}
