import request from 'supertest';
import app from '../src/app';

const queryApp = (query, variables, method = 'get') => {
    return request(app)[method](`/gql`).query({ query, variables: JSON.stringify(variables) }).set('Accept', 'application/json');
};

describe('GraphQL endpoint healthcheck', () => {
    it('When calling healthcheck query, it must return OK', () => {
        return queryApp('query Healthcheck { healthcheck }', {}).then(response => {
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual({ data: { healthcheck: 'OK' } });
        });
    });
});
