import { Router } from 'express';

import { h } from 'preact';
import render from 'preact-render-to-string';

import Application from '../Application';

const Html = ({ scriptUrl, cssUrl, children }) =>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <title>Ode to enjoy</title>
            <meta name="description" property="og:description" content="descriptiojn" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href={cssUrl} />
        </head>
        <body>
            <div id="app">{children}</div>
            <script src={scriptUrl} defer></script>
            <script src="http://localhost:35729/livereload.js?snipver=1" async></script>
        </body>
    </html>;

const router = Router();

router.get('*', (req, res) => {
    const scriptUrl = '/static/main.js';
    const cssUrl = '/static/main.css';
    const html = render(<Html scriptUrl={scriptUrl} cssUrl={cssUrl}><Application url={req.url} /></Html>);
    res.send(html);
});


export default router;
