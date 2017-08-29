import { buildSchema } from 'graphql';

export default buildSchema(`
schema {
    query: Query,
    mutation: Mutation
}

type Query {
    healthcheck: String

    crawlUrl(url: String!): CrawlResult
}

type Video2 {
    id: ID!
    title: String


    # resolution: Resolution
    # url: String
    # embed: String
}

type MediaUrls {
    canonical: String
    embed: String
}

type Resolution {
    width: Int
    height: Int
}

type Mutation {
    createVideo(videoInput: VideoInput!): Video

    suggestVideo(input: VideoSuggestionInput!): VideoSuggestionResult!
}

input VideoSuggestionInput {
    url: String!
    title: String
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
