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

app.get('/stats', (req, res) => {
    const mem = process.memoryUsage();
    for (let key in mem) {
        mem[key] = `${(mem[key] / 1048576).toFixed(2)} MB`;
    }

    res.send({
        memoryUsage: mem,
        uptime: process.uptime(),
    });
});

app.use('*', applicationRouter);

export default app;