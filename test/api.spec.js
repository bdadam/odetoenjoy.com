
import request from 'supertest';
import app from '../src/app';


const queryApp = (query, variables) => {
    return request(app).get(`/gql`).query({ query, variables: JSON.stringify(variables) }).set('Accept', 'application/json');
};

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
    it('Blubb', () => {

        const query = `
            query Test($id: String) {
                test(id: $id) {
                    test
                }
            }
        `;

        return queryApp(query, { id: '5' }).then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchSnapshot();
        });
    });

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
