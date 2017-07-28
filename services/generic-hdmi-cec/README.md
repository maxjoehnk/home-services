# hdmi-cec-service
This Service exposes the libcec functionality via a HTTP API.

There are multiple predefined internal endpoints and you can add as many
custom endpoints as you want.
Each custom endpoint takes an url and a command to execute with `cec-client`.

This Service requires the `cec-client` to be installed. Detailed Instructions on how to do this can be found [here](https://github.com/Pulse-Eight/libcec).

# Configuration
```yaml
port: 8080
endpoints:
    internal:
        exec: false
        standby: true
    custom:
        -   url: /chromecast
            cmd: tx 1f 82 40 00
```
