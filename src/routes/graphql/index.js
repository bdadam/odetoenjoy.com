import { Router } from 'express';
import graphqlHTTP from 'express-graphql';

import schema from './schema';
import root from './root';

const router = Router();

// const ctx = { test: 123 };
// const r = graphql(schema, '{ text }', root, ctx);
// r.then(x => console.log(x));

router.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    formatError: error => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack,
        path: error.path
    })
}));

export default router;
