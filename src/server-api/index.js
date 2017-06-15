const express = require('express');

const graphqlHTTP = require('express-graphql');
const { buildSchema, graphql } = require('graphql');

const router = express.Router();

const schema = buildSchema(`
    type Query {
        text: String,
        crawlUrl(url: String!): CrawlResult
    }

    type CrawlResult {
        url: String!
        canonicalUrl: String
        title: String
        videos: [CrawledVideo]
        images: [CrawledImage]
    }

    type CrawledVideo {
        url: String,
        width: Int,
        height: Int,
        type: String
    }

    type CrawledImage {
        url: String,
        width: Int,
        height: Int
    }
`);

const root = {
    text: (args, ctx) => console.log(ctx) || 'TEST Text',
    crawlUrl: (args, ctx) => {
        const crawl = require('metatag-crawler');

        return new Promise((resolve, reject) => {
            crawl(args.url, (err, data) => {
                if (err) {
                    return reject(err);
                }

                resolve({
                    title: data.og.title || data.meta.title,
                    canonicalUrl: data.meta.canonical || data.og.url,
                    url: args.url,
                    videos: data.og.videos,
                    images: data.og.images
                    // videos: data.og.videos.filter(v => v.type === 'text/html' || !v.type)
                });
            });
        });    
    }
};

// const ctx = { test: 123 };
// const r = graphql(schema, '{ text }', root, ctx);
// r.then(x => console.log(x));

router.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

export default router;
