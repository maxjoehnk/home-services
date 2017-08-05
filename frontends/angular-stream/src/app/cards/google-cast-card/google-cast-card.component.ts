import { Component, Input } from '@angular/core';
import { ICard, ICardStyle } from '../card.interface';

@Component({
    selector: 'google-cast-card',
    templateUrl: './google-cast-card.component.html',
    styleUrls: ['./google-cast-card.component.scss']
})
export class GoogleCastCardComponent {

    cast = {};
    style: ICardStyle = {};

    @Input()
    set card(card: ICard) {
        this.cast = card.payload;
        this.style = card.style;
    }
}
