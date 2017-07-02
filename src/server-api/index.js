const express = require('express');

const graphqlHTTP = require('express-graphql');
const { buildSchema, graphql } = require('graphql');

const router = express.Router();

const schema = buildSchema(`
    schema {
        query: Query,
        mutation: Mutation
    }

    type Query {
        crawlUrl(url: String!): CrawlResult
        # findPage
    }

    type Mutation {
        addVideo(videoInput: VideoInput!): VideoPageSummary
    }

    type VideoPage {
        id: ID!
        slug: String!
        title: String!
        description: String
        tags: [String]
        videos: [Video]
    }

    type Video {
        previewImage: Image
        embedUrl: String!
        duration: Int
    }

    type Image {
        id: ID
    }

    type PageMetaData {
        title: String!
        description: String
        canonicalUrl: String!
    }

    input VideoInput {
        url: String!
        title: String!
        description: String
        tags: [String]
    }

    type VideoPageSummary {
        id: String!
        url: String!
        title: String!
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

import { createPreviewFromUrl } from '../services/image-service';

createPreviewFromUrl('https://i.ytimg.com/vi/fW8amMCVAJQ/hqdefault.jpg').then(x => console.log(x));

// import Video from '../models/video-model';

// Video.create({
//     title: 'TEST',
//     description: 'sdfsfsdf'
// }).then(v => {
//     console.log(v);
// });

// Video.all().then(vids => {
//     console.log(vids);
// });

const root = {
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
    },
    addVideo: (args, ctx) => {
        console.log(args);

        return new Promise((resolve, reject) => {
            resolve({
                id: args.id || '123',
                url: args.videoInput.url || 'sdfdsf',
                title: args.videoInput.title || 'sfdsdfsd'
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
