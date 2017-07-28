# home-services
[![Build Status](https://travis-ci.org/maxjoehnk/home-services.svg?branch=master)](https://travis-ci.org/maxjoehnk/home-services)

A Collection of Micro Services for Home Automation.

Each Service is supposed to do one thing, but do it good.

Services can provide or call HTTP APIs which allows seemless integration into other home automation systems, as long as they provide HTTP APIs themself.
This also allows a distributed installation of services, e.g. on multiple Raspberry Pi's.

# Supported Services

## Generic
- [GPIO](https://github.com/maxjoehnk/home-services/tree/master/services/generic-gpio)
- [HDMI-CEC](https://github.com/maxjoehnk/home-services/tree/master/services/generic-hdmi-cec)
- [Scenes](https://github.com/maxjoehnk/home-services/tree/master/services/generic-scenes)
- [Timers](https://github.com/maxjoehnk/home-services/tree/master/services/generic-timers)

## Google
- [Cast](https://github.com/maxjoehnk/home-services/tree/master/services/google-cast)

## Philips
- [Hue](https://github.com/maxjoehnk/home-services/tree/master/services/philips-hue)

## Amazon
- [Dash Button](https://github.com/maxjoehnk/home-services/tree/master/services/amazon-dash-button)

## Yamaha
- [AVR](https://github.com/maxjoehnk/home-services/tree/master/services/yamaha-avr)
