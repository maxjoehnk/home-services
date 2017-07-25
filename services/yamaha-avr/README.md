# yamaha-avr-service
Expose Yamaha AVR remote control as a http api

# Configuration
```yaml
port: 8080
ip: 192.168.2.102
```

# Endpoints
## GET: /
## GET: /power/off
Turns the avr off

## GET: /power/on
Turns the avr on

## GET: /power/toggle
Toggles the power of the avr

## GET: /volume/mute
Mutes the avr

## GET: /volume/unmute
Unmutes the avr

## GET: /volume
Returns the current volume of the avr

## GET: /volume/:value
Sets the volume to the absolute value
