# cast-service
Expose Chromecasts as a http api

# Configuration
```yaml
port: 8080
devices:
    My Chromecast:
        events:
            play:
                filter:
                    - Google Play Music
                    - SoundCloud
                urls:
                    - http://google.com
            pause:
                - http://google.com
            mute:
                - http://google.com
            unmute:
                - http://google.com
            volume:
                - http://google.com

```
