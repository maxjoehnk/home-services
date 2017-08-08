import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import {
    LOAD_SCENES,
    LoadScenesSuccess,
    LoadScenesFailed,
    ACTIVATE_SCENE,
    ActivateScene
} from '../actions/scenes';

@Injectable()
export class ScenesEffects {

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(LOAD_SCENES)
        .mergeMap(() => this.http.get('/_api/scenes')
            .map(data => new LoadScenesSuccess(data.json()))
            .catch(err => of(new LoadScenesFailed(err)))
        );

    @Effect({ dispatch: false })
    activate$ = this.actions$
        .ofType(ACTIVATE_SCENE)
        .map(toPayload)
        .do(payload => this.http.post(`/_api/scenes/${payload}/activate`, null).subscribe());

    constructor(
        private actions$: Actions,
        private http: Http
    ) { }
}
