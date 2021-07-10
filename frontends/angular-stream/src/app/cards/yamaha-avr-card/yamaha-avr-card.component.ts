import { Component, Input } from '@angular/core';
import { ICard, ICardStyle } from '../card.interface';

@Component({
    selector: 'yamaha-avr-card',
    templateUrl: './yamaha-avr-card.component.html',
    styleUrls: ['./yamaha-avr-card.component.scss']
})
export class YamahaAvrCardComponent {

    avr: any = {};
    style: ICardStyle = {};

    @Input()
    set card(card: ICard) {
        this.avr = card.payload;
        this.style = card.style;
    }
}
