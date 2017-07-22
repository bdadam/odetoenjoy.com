import request from 'supertest';
import app from '../src/app';


const queryApp = (query, variables) => {
    return request(app).get(`/gql`).query({ query, variables: JSON.stringify(variables) }).set('Accept', 'application/json');
};

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
});
