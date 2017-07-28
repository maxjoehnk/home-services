# timers-service
Fetch urls based on cron job formats.

# Configuration
```yaml
timers:
    -   cron: "00 20 * * *" # Fetch Urls every day at 8pm
        urls:
            - http://google.com
```
