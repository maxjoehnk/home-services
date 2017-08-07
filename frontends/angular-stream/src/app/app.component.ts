import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IState, IChipsState, IConfigurationState } from './store';
import { LoadChips } from './store/actions/chips';
import { LoadConfiguration } from './store/actions/configuration';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    configuration: Observable<any>;
    chips: Observable<IChipsState>;

    constructor(private store: Store<IState>) {
        this.configuration = store.select('configuration')
            .map(configuration => configuration.configuration);
        this.chips = store.select('chips');
    }

    ngOnInit() {
        this.store.dispatch(new LoadConfiguration());
        this.store.dispatch(new LoadChips());
    }
}
