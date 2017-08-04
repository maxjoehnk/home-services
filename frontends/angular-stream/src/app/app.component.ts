import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    cards = [
        {
            type: 'weather',
            payload: {
                current: {
                    id: 803,
                    main: 'Clouds',
                    description: 'Überwiegend bewölkt',
                    temperature: {
                        min: 21,
                        max: 21,
                        current: 21
                    },
                    pressure: 1009,
                    humidity: 60,
                    wind: {
                        speed: 9.3,
                        direction: 260
                    },
                    cloudiness: 75
                },
                forecast: [
                    {
                        date: '2017-08-04T11:00:00.000Z',
                        weather: {
                            id: 500,
                            main: 'Rain',
                            description: 'Leichter Regen',
                            temperature: {
                                min: 15.7,
                                max: 21
                            },
                            pressure: 1018.87,
                            humidity: 74,
                            wind: {
                                speed: 9.65,
                                direction: 248
                            },
                            cloudiness: 56
                        }
                    },
                    {
                        date: '2017-08-05T11:00:00.000Z',
                        weather: {
                            id: 500,
                            main: 'Rain',
                            description: 'Leichter Regen',
                            temperature: {
                                min: 15.7,
                                max: 21
                            },
                            pressure: 1022.41,
                            humidity: 94,
                            wind: {
                                speed: 3.6,
                                direction: 269
                            },
                            cloudiness: 92
                        }
                    },
                    {
                        date: '2017-08-06T11:00:00.000Z',
                        weather: {
                            id: 802,
                            main: 'Clouds',
                            description: 'Überwiegend bewölkt',
                            temperature: {
                                min: 11.55,
                                max: 18.48
                            },
                            pressure: 1030.64,
                            humidity: 80,
                            wind: {
                                speed: 5.9,
                                direction: 276
                            },
                            cloudiness: 44
                        }
                    },
                    {
                        date: '2017-08-07T11:00:00.000Z',
                        weather: {
                            id: 800,
                            main: 'Clear',
                            description: 'Klarer Himmel',
                            temperature: {
                                min: 13.43,
                                max: 21.02
                            },
                            pressure: 1031.47,
                            humidity: 84,
                            wind: {
                                speed: 2.66,
                                direction: 168
                            },
                            cloudiness: 0
                        }
                    },
                    {
                        date: '2017-08-08T11:00:00.000Z',
                        weather: {
                            id: 501,
                            main: 'Rain',
                            description: 'Mäßiger Regen',
                            temperature: {
                                min: 18.27,
                                max: 25.19
                            },
                            pressure: 1019.53,
                            humidity: 0,
                            wind: {
                                speed: 3.84,
                                direction: 162
                            },
                            cloudiness: 72
                        }
                    }
                ]
            },
            style: {}
        },
        {
            type: 'google-cast',
            payload: {

            },
            style: {}
        }
    ];
}
