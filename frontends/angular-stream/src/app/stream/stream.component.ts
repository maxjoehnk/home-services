import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IState, IStreamState } from '../store';
import { LoadCards } from '../store/actions/stream';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {
    stream: Observable<IStreamState>;

    constructor(private store: Store<IState>) {
        this.stream = store.select('stream');
    }

    ngOnInit() {
        this.store.dispatch(new LoadCards());
    }
}
