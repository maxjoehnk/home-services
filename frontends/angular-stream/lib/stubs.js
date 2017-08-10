/* eslint-disable */
const stream = [
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
    }
];

const chips = [
    {
        temperature: '22',
        type: 'weather'
    },
    {
        icon: 'lock-open-outline',
        type: 'icon'
    }
];

const presence = [
    {
        name: 'Max',
        image: 'https://lh3.googleusercontent.com/-1B6P0McjjXc/AAAAAAAAAAI/AAAAAAAAAAA/AMp5VUq1mXN5bkf09X2GKtXQhrf4rJlURg/s96-c-mo-md/photo.jpg'
    }
];

module.exports = {
    chips,
    stream,
    presence
};
