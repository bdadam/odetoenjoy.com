import path from 'path';

import express from 'express';

const staticRouter = express.Router();

// app.use('/static', express.static(path.resolve(process.cwd(), 'dist'), { maxAge: '30 days', index: false, etag: false }));
staticRouter.use('/images', express.static(path.resolve(process.cwd(), 'static/images'), { index: false, etag: false }));
staticRouter.use('/', express.static(path.resolve(process.cwd(), 'dist'), { index: false, etag: false }));

export default staticRouter;
