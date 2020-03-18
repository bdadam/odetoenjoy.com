import Datastore from 'nedb-promises';

import { Video } from 'types';

export default async () => {
    const db = Datastore.create({ filename: 'content/videos.nedb' });
    const videos = await db.find<Video>({});

    return videos;
};
