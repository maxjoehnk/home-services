import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IState, IStreamState, IChipsState } from './store';
import { LoadCards } from './store/actions/stream';
import { LoadChips } from './store/actions/chips';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    stream: Observable<IStreamState>;
    chips: Observable<IChipsState>;

    constructor(private store: Store<IState>) {
        this.stream = store.select('stream');
        this.chips = store.select('chips');
    }

    ngOnInit() {
        this.store.dispatch(new LoadCards());
        this.store.dispatch(new LoadChips());
    }
}
