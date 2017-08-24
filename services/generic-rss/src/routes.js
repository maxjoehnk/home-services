const { NotFoundError } = require('restify-errors');

module.exports = (server, store) => {
    server.get('/feeds', (req, res) => {
        const { items, meta, feeds } = store.getState();
        const ids = Object.getOwnPropertyNames(feeds);
        const result = {};
        ids.forEach(id => {
            result[id] = {
                items: items[id],
                meta: meta[id]
            };
        });
        res.status(200);
        res.json(result);
        res.end();
    });

    server.get('/feeds/:id', (req, res, next) => {
        const { id } = req.params;
        const { items, meta, feeds } = store.getState();
        if (!feeds[id]) {
            return next(new NotFoundError(`Invalid Feed Id ${id}`));
        }
        const result =  {
            items: items[id],
            meta: meta[id]
        };
        res.status(200);
        res.json(result);
        res.end();
    });

    server.get('/feeds/:id/items', (req, res, next) => {
        const { id } = req.params;
        const { items, feeds } = store.getState();
        if (!feeds[id]) {
            return next(new NotFoundError(`Invalid Feed Id ${id}`));
        }
        res.status(200);
        res.json(items[id]);
        res.end();
    });

    server.get('/feeds/:id/meta', (req, res, next) => {
        const { id } = req.params;
        const { meta, feeds } = store.getState();
        if (!feeds[id]) {
            return next(new NotFoundError(`Invalid Feed Id ${id}`));
        }
        res.status(200);
        res.json(meta[id]);
        res.end();
    });
};
