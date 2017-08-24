const FeedParser = require('feedparser');
const fetch = require('node-fetch');
const logger = require('./logger');

const parse = async url => {
    logger.debug(`Fetching Feed ${url}`);
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Feed not reachable');
    }
    logger.debug(`Parsing Feed ${url}`);
    const parser = new FeedParser();
    res.body.pipe(parser);
    const { meta, items } = await new Promise((resolve, reject) => {
        const feed = {
            meta: {},
            items: []
        };
        parser.on('error', err => reject(err));
        parser.on('readable', () => {
            feed.meta = parser.meta;
            let current;
            while (current = parser.read()) { // eslint-disable-line
                feed.items.push(current);
            }
        });
        parser.on('end', () => {
            resolve(feed);
        });
    });

    return {
        meta: {
            title: meta.title,
            link: meta.link,
            image: meta.image.url,
            description: meta.description,
            author: meta.author
        },
        items: items.map(({
            author,
            date,
            description,
            title,
            image,
            link
        }) => ({
            author,
            date,
            description,
            title,
            image: image.url,
            link
        }))
    };
};

module.exports = {
    parse
};
