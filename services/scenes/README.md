# scenes-service
Allows to configure scenes

# Configuration
```yaml
port: 8080
scenes:
    movienight:
        enabled: true
        states:
            playing:
                - url
            paused:
                - url
        default: playing

```

# Endpoints
## GET: /scenes/:scene/active

## GET: /scenes/:scene/activate

## GET: /scenes/:scene/deactivate

## GET: /scenes/:scene/enabled

## GET: /scenes/:scene/enable

## GET: /scenes/:scene/disable

## GET: /scenes/:scene/states

## GET: /scenes/:scene/:state/activate
