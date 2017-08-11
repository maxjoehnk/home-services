import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IState, IStreamState } from '../store';
import { LoadCards, LoadCardsSuccess } from '../store/actions/stream';
import * as ReconnectingWebSocket from 'reconnecting-websocket';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {
    stream: Observable<IStreamState>;
    ws: WebSocket;
    snackBarRef: MdSnackBarRef<any>;

    constructor(private store: Store<IState>, private snackBar: MdSnackBar) {
        this.stream = store.select('stream');
    }

    ngOnInit() {
        this.store.dispatch(new LoadCards());
        this.snackBarRef = this.snackBar.open('Connecting...');
        this.ws = new ReconnectingWebSocket(`ws://${location.host}`);
        this.ws.addEventListener('message', event => {
            this.store.dispatch(new LoadCardsSuccess(JSON.parse(event.data)));
        });
        this.ws.addEventListener('close', () => {
            if (!this.snackBarRef) {
                this.snackBar.open('Connecting...');
            }
        });
        this.ws.addEventListener('open', () => {
            this.snackBarRef = undefined;
            this.snackBar.open('Connected', null, {
                duration: 1000
            });
        });
    }
}
