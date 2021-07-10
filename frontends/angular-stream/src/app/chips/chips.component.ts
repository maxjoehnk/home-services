import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IState, IChipsState } from '../store';
import { LoadChips } from '../store/actions/chips';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
    chips: Observable<IChipsState>;

    constructor(private store: Store<IState>) {
        this.chips = store.select('chips');
    }

    ngOnInit() {
        this.store.dispatch(new LoadChips());
    }
}
