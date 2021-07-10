import { Component, Input } from '@angular/core';
import { ICard } from './card.interface';

@Component({
    selector: 'stream-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

    @Input()
    cards: ICard[];

}
