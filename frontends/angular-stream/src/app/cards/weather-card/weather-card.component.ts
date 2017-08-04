import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'weather-card',
    templateUrl: './weather-card.component.html',
    styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {

    weather = {};
    style = {};

    @Input()
    set card(card: any) {
        this.weather = card.payload;
        this.style = card.style;
    }

    mapCodeToIcon(code: number): string {
        let icon = 'mdi mdi-weather-';
        switch (code) {
            case 300:
            case 301:
            case 302:
            case 310:
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
                icon += 'rainy';
                break;
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            case 511:
            case 520:
            case 521:
            case 522:
            case 531:
                icon += 'pouring';
                break;
            case 600:
            case 601:
            case 602:
            case 611:
            case 612:
                icon += 'snowy';
                break;
            case 615:
            case 616:
            case 620:
            case 621:
            case 622:
                icon += 'snowy-rain';
                break;
            case 701:
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
            case 771:
            case 781:
                icon += 'fog';
                break;
            case 800:
                icon += 'sunny';
                break;
            case 801:
            case 802:
            case 803:
            case 804:
                icon += 'cloudy';
                break;
            default:
                throw new Error('Invalid Weather Code');
        }
        return icon;
    }

}
