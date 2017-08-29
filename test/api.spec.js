import { graphql } from 'graphql';
import schema from '../src/routes/graphql/schema';
import root from '../src/routes/graphql/root';

import request from 'supertest';
import app from '../src/app';



const queryApp = (query, variables, method = 'get') => {
    return request(app)[method](`/gql`).query({ query, variables: JSON.stringify(variables) }).set('Accept', 'application/json');
};

describe('Video Suggestions', () => {
    it('Happy case', () => {
        const mutation = `
            mutation VideoSuggestion($input: VideoSuggestionInput!) {
                suggestVideo(input: $input) {
                    accepted
                    url
                }
            }
        `;

        const input = {
            url: 'some-very-good-video-url',
            title: 'A very good title',
            description: 'Some description',
            tags: ['tag1', 'tag2', 'tag3']
        };

        // const x = 'xxxxxxxx'.replace(/x/g, () => {
        //     const alphabet = 'abcdef';
        //     return alphabet[Math.random() * alphabet.length | 0];
        // });
        // console.log(x);

        return queryApp(mutation, { input }, 'post').then(response => {
            expect(response.statusCode).toEqual(200);
            expect(response.body).toMatchSnapshot();
        });
    });
});
// jest.mock('../src/services/video-post-service.js', () => {
//     return {
//         fetchMetaData(url) {
//             switch(url) {
//                 case 'fine-url':
//                     return Promise.resolve({
//                         title: 'TITLE',
//                         canonicalUrl: `canonical-${url}`
//                     });
//             }
//         }
//     };
// });

describe('Test', () => {
    it('FetchMetaData', () => {

        const query = `
            query ($url: String!) {
                crawlUrl(url: $url) {
                    title
                    canonicalUrl
                    videos {
                        url
                        type
                    }
                }
            }
        `;
    
        return queryApp(query, { url: 'fine-url' }).then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchSnapshot();
        });
    });
});

// jest.mock('../src/databases/videodb');

import videoModel from '../src/models/video-model';
jest.mock('../src/databases/videodb');

describe('Post video', () => {
    beforeEach(() => {

    });

    it('bbb', () => {
        videoModel.create({
            title: 'title'
        });
    });    
});
