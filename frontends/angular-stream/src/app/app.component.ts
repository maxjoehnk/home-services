import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ICard } from './cards/card.interface';
import { IState } from './store';
import { LoadCards } from './store/actions/stream';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    stream: Observable<ICard[]>;

    constructor(private store: Store<IState>) {
        this.stream = store.select('stream')
            .map(state => state.stream);
    }

    ngOnInit() {
        this.store.dispatch(new LoadCards());
    }
}
