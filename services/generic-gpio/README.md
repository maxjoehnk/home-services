# gpio-service
This Service exposes GPIO Ports over an HTTP Endpoint and allows calling of remote Endpoints from Interrupts.

# Configuration
```yaml
interrupts:
    -   pin: 10
        urls:
            -   http://google.com
        edge: FALLING
        pud: DOWN
outputs:
    -   name: led
        mode: rgb
        pins:
            r: 1
            g: 2
            b: 3
    -   name: light
        mode: digital
        pin: 4
    -   name: white
        mode: pwm
        pin: 5
endpoints:
    -   url: /led
        mode: set
        name: led
        value: rgb(255, 128, 64)
    -   url: /light
        mode: toggle
        name: light
    -   url: /white
        mode: set
        name: white
        value: 255

```
