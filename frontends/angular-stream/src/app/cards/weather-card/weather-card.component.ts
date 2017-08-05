import { Component, OnInit, Input } from '@angular/core';
import { ICard, ICardStyle } from '../card.interface';

@Component({
    selector: 'weather-card',
    templateUrl: './weather-card.component.html',
    styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {

    weather = {};
    style: ICardStyle = {};

    @Input()
    set card(card: ICard) {
        this.weather = card.payload;
        this.style = card.style;
    }
}
