import path from 'path';

import { h } from 'preact';
import Helmet from 'preact-helmet';
import render from 'preact-render-to-string';

import Application from './Application';

import express from 'express';

const app = express();

app.disable('x-powered-by');

const Html = ({ head, scriptUrl, cssUrl, children }) => {
    const htmlAttributes = head.htmlAttributes.toComponent();

    return (
        <html {...htmlAttributes}>
            <head>
                <meta charset="utf-8" />
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href={cssUrl} />
            </head>
            <body>
                <div id="app">{children}</div>
                <script src={scriptUrl} defer></script>
            </body>
        </html>
    );
};

// app.use('/static', express.static(path.resolve(process.cwd(), 'dist'), { maxAge: '30 days', index: false, etag: false }));
app.use('/static', express.static(path.resolve(process.cwd(), 'dist'), { index: false, etag: false }));
app.use('/images', express.static(path.resolve(process.cwd(), 'static/images'), { index: false, etag: false }));

import Image from './models/image-model';

app.get('/img/count', (req, res) => {
    Image.count().then(c => {
        res.send(c);
    });
});

app.get('/img/:id', (req, res) => {
    Image.findById(req.params.id).then(img => {
        res.type('jpg').send(img.image);
    });
});

import gqlRouter from './server-api';

app.use('/gql', gqlRouter);


app.get('*', (req, res) => {
    const head = Helmet.rewind();
    const scriptUrl = '/static/main.js';
    const cssUrl = '/static/main.css';
    const html = render(<Html head={head} scriptUrl={scriptUrl} cssUrl={cssUrl}><Application url={req.url} /></Html>);
    res.send(html);
});

export default app;
