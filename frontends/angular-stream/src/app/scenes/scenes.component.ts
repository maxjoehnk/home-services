import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IState, IScenesState } from '../store';
import { LoadScenes } from '../store/actions/scenes';

@Component({
    selector: 'app-scenes',
    templateUrl: './scenes.component.html',
    styleUrls: ['./scenes.component.scss']
})
export class ScenesComponent implements OnInit {
    scenes: Observable<IScenesState>;

    constructor(private store: Store<IState>) {
        this.scenes = store.select('scenes');
    }

    ngOnInit() {
        this.store.dispatch(new LoadScenes());
    }
}
