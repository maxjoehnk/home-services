import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICard, ICardStyle } from '../card.interface';
import { StopCasting } from '../../store/actions/google-cast';
import { IState } from '../../store';

interface IGoogleCastCard {
    id: string;
    name: string;
    application?: {
        title: string;
        name: string;
        image: string;
    };
}

@Component({
    selector: 'google-cast-card',
    templateUrl: './google-cast-card.component.html',
    styleUrls: ['./google-cast-card.component.scss']
})
export class GoogleCastCardComponent {

    cast: IGoogleCastCard;
    style: ICardStyle = {};

    @Input()
    set card(card: ICard) {
        this.cast = card.payload;
        this.style = card.style;
    }

    constructor(private store: Store<IState>) {}

    onStopClick() {
        this.store.dispatch(new StopCasting(this.cast.id));
    }
}
