import { Router } from 'express';

import { h } from 'preact';
import Helmet from 'preact-helmet';
import render from 'preact-render-to-string';

import Application from '../Application';

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

const router = Router();

router.get('*', (req, res) => {
    const head = Helmet.rewind();
    const scriptUrl = '/static/main.js';
    const cssUrl = '/static/main.css';
    const html = render(<Html head={head} scriptUrl={scriptUrl} cssUrl={cssUrl}><Application url={req.url} /></Html>);
    res.send(html);
});


export default router;
