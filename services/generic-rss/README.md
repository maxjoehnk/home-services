# rss-service
Allow Watching of RSS Feeds

# Configuration
```yaml
port: 8080
interval: 1800000 # 30 Minutes
feeds:
    -   id: frontendhappyhour
        url: http://feeds.soundcloud.com/users/soundcloud:users:206137365/sounds.rss
        notify:
            - http://google.com
```
