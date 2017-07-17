import { Router } from 'express';

const graphqlHTTP = require('express-graphql');
const { buildSchema, graphql } = require('graphql');

const router = Router();

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
        createVideo(videoInput: VideoInput!): Video

        suggestVideo(input: VideoSuggestion!): VideoSuggestionResult
        
    }

    input VideoSuggestion {
        url: String!
        title: String!
        description: String
        tags: [String]
        
    }

    type VideoSuggestionResult {
        accepted: Boolean!
        url: String
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

// import { createPreviewFromUrl } from '../services/image-service';

// createPreviewFromUrl('https://i.ytimg.com/vi/fW8amMCVAJQ/hqdefault.jpg').then(x => console.log(x));

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

// Promise.race([fetch('...'), new Promise(resolve => setTimeout(resolve, 2000))]).then(...);

import VideoPostService from '../services/video-post-service';

const root = {
    crawlUrl: (args, ctx) => {
        return VideoPostService.fetchMetaData(args.url);
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
