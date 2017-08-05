import { Component, Input } from '@angular/core';
import { ICard, ICardStyle } from '../card.interface';

@Component({
  selector: 'philips-hue-card',
  templateUrl: './philips-hue-card.component.html',
  styleUrls: ['./philips-hue-card.component.scss']
})
export class PhilipsHueCardComponent {
    light = {};
    style: ICardStyle = {};

    @Input()
    set card(card: ICard) {
        this.light = card.payload;
        this.style = card.style;
    }
}
