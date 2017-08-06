import { ICard } from '../cards/card.interface';

const stream: ICard[] = [
    {
        type: 'weather',
        payload: {
            current: {
                icon: 'mdi-weather-cloudy',
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
                        icon: 'mdi-weather-pouring',
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
                        icon: 'mdi-weather-pouring',
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
                        icon: 'mdi-weather-cloudy',
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
                        icon: 'mdi-weather-sunny',
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
                        icon: 'mdi-weather-pouring',
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
        style: {},
        priority: 1
    },
    {
        type: 'google-cast',
        payload: {
            name: 'Max Room',
            application: {
                title: 'You Me Her',
                name: 'Netflix',
                image: 'https://occ-0-768-769.1.nflxso.net/art/fb819/24fd7fb1a1f64dff7e755054a1e49e11684fb819.jpg'
            }
        },
        style: {},
        priority: 2
    },
    {
        type: 'google-cast',
        payload: {
            name: 'Living Room',
            application: {
                title: 'How I Met Your Mother',
                name: 'Netflix',
                image: 'https://occ-0-781-783.1.nflxso.net/art/75589/9ffd571632c0fd12cbc01b8118b00c87e9f75589.webp'
            }
        },
        style: {},
        priority: 100
    },
    {
        type: 'philips-hue',
        payload: {
            id: 1,
            state: {
                power: false,
                brightness: 254,
                hue: 39392,
                saturation: 13,
                effect: 'none',
                xy: [
                    0.3691,
                    0.3719
                ],
                ct: 230,
                alert: 'select',
                colormode: 'xy',
                reachable: true
            },
            type: 'Extended color light',
            name: 'Mitte'
        },
        priority: 90
    },
    {
        type: 'philips-hue',
        payload: {
            id: 2,
            state: {
                power: false,
                brightness: 254,
                hue: 39392,
                saturation: 13,
                effect: 'none',
                xy: [
                    0.3691,
                    0.3719
                ],
                ct: 230,
                alert: 'select',
                colormode: 'xy',
                reachable: true
            },
            type: 'Extended color light',
            name: 'Rechts'
        },
        priority: 90
    },
    {
        type: 'philips-hue',
        payload: {
            id: 3,
            state: {
                power: true,
                brightness: 254,
                hue: 39392,
                saturation: 13,
                effect: 'none',
                xy: [
                    0.3691,
                    0.3719
                ],
                ct: 230,
                alert: 'select',
                colormode: 'xy',
                reachable: true
            },
            type: 'Extended color light',
            name: 'Links'
        },
        priority: 90
    },
    {
        type: 'yamaha-avr',
        payload: {
            name: 'Max AV-Receiver',
            zones: {
                Main_Zone: {
                    input: 'Chrome',
                    volume: -300
                }
            },
            inputs: [
                'Chrome'
            ]
        },
        priority: 2
    }
];

export {
    stream
};
