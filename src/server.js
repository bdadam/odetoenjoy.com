import path from 'path';

import { h } from 'preact';
import Helmet from 'preact-helmet';
import render from 'preact-render-to-string';

import Application from './Application';

import express from 'express';

const app = express();

app.disable('x-powered-by');

const Html = ({ head, scriptUrl, cssUrl, app }) => {
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
                <div id="app" dangerouslySetInnerHTML={{ __html : app }}></div>
                <script src={scriptUrl} defer></script>
            </body>
        </html>
    );
};

app.use('/static', express.static(path.resolve(process.cwd(), 'dist'), { maxAge: '30 days', index: false, etag: false }));

app.get('/', (req, res) => {
    const app = render(<Application x="server" />);
    const head = Helmet.rewind();
    const scriptUrl = '/static/main.js';
    const cssUrl = '/static/main.css';
    const html = render(<Html head={head} scriptUrl={scriptUrl} cssUrl={cssUrl} app={app} />);
    res.send(html);
});


export default app;