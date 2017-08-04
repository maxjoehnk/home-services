import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'google-cast-card',
    templateUrl: './google-cast-card.component.html',
    styleUrls: ['./google-cast-card.component.scss']
})
export class GoogleCastCardComponent implements OnInit {

    @Input()
    card: any;

    constructor() { }

    ngOnInit() {
    }

}
