import request from 'supertest';
import app from '../src/app';

import { graphql } from 'graphql';
import schema from '../src/routes/graphql/schema';
import root from '../src/routes/graphql/root';

const queryApp = (query, variables, method = 'get') => {
    return request(app)[method](`/gql`).query({ query, variables: JSON.stringify(variables) }).set('Accept', 'application/json');
};

describe('GraphQL endpoint healthcheck', () => {
    it('When calling healthcheck query over http endpoint, it must return OK', () => {
        return queryApp('query Healthcheck { healthcheck }', {}).then(response => {
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual({ data: { healthcheck: 'OK' } });
        });
    });

    it('When calling healthcheck query directly, it must return OK', () => {
        return graphql(schema, 'query { healthcheck }', root).then(result => {
            expect(result).toEqual({ data: { healthcheck: 'OK' } });
        });
    });

    // it('Test', () => {
    //     return graphql(schema, 'query { test1(x: 12) { test2(y: 24) { test3 } } }', root).then(result => {
    //         // console.log(JSON.stringify(result));
    //         expect(result).toEqual({ data: { test1: { test2: { test3: 'test3: 288' } } } });
    //     });
    // });
});
