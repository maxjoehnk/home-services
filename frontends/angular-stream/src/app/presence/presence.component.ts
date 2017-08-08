import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IState, IPresenceState } from '../store';
import { LoadPresence } from '../store/actions/presence';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {
    presence: Observable<IPresenceState>;

    constructor(private store: Store<IState>) {
        this.presence = store.select('presence');
    }

    ngOnInit() {
        this.store.dispatch(new LoadPresence());
    }
}
