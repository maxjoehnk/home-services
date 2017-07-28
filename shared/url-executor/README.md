# url-executor
Allows fetching of one or multiple urls

# API
```javascript
const execute = require('@home-services/url-executor');

await execute('http://google.com'); // GET single url
await execute(['http://google.com', 'http://youtube.com']) // GET multiple urls
await execute({
    url: 'http://google.com',
    options: {
        method: 'POST',
        body: {
            hello: 'world'
        },
        timeout: 0, // 0 = unlimited
        redirect: 'follow', // manual, error, follow
        follow: 20, // 0 don't follow
    }
}); // POST single url with custom options
await execute([{
    url: 'http://google.com',
    options: {
        method: 'POST'
    }
}, 'http://youtube.com']); // GET one and POST one url
```
