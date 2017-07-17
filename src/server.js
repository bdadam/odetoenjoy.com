import express from 'express';

import staticRouter from './routes/static';
import graphqlRouter from './routes/graphql';
import imageRouter from './routes/image';
import applicationRouter from './routes/application';

const app = express();
app.disable('x-powered-by');

app.use('/static', staticRouter);
app.use('/gql', graphqlRouter);
app.use('/img', imageRouter);
app.use('*', applicationRouter);

export default app;
