# openweathermap-service
Provide a cached Endpoint for the openweathermap API.

# Configuration
You need to specify an API Key and either the city id or a city name for the service to work

```yaml
port: 8080
api:
    units: metric # <metric|imperial|internal>
    lang: en # <en|ru|it|sp|ua|de|pt|ro|pl|fi|nl|fr|bg|se|zh_tw|zh_cn>
    id: # city id
    q: # city name e.g. London,UK
apiKey: yourapikey
```
