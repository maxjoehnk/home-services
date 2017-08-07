import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IState, IConfigurationState } from './store';
import { LoadConfiguration } from './store/actions/configuration';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    configuration: Observable<any>;

    constructor(private store: Store<IState>) {
        this.configuration = store.select('configuration')
            .map(configuration => configuration.configuration);
    }

    ngOnInit() {
        this.store.dispatch(new LoadConfiguration());
    }
}
