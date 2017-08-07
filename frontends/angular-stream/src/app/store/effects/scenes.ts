import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { LOAD_SCENES, LoadScenesSuccess, LoadScenesFailed } from '../actions/scenes';

@Injectable()
export class ScenesEffects {

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(LOAD_SCENES)
        .mergeMap(() => this.http.get('/_api/scenes')
            .map(data => new LoadScenesSuccess(data.json()))
            .catch(err => of(new LoadScenesFailed(err)))
        );

    constructor(
        private actions$: Actions,
        private http: Http
    ) { }
}
