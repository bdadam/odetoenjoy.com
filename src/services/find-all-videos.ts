import fs from 'fs-extra';
// import Datastore from 'nedb-promises';

import { Video } from 'types';

// const db = Datastore.create({ filename: 'content/videos.nedb' });

export default async () => {
    // const videos = await db.find<Video>({});

    const content = fs.readFileSync('content/videos.nedb', 'utf-8');
    // content.split('\n').forEach((l) => console.log(l));
    const videos: Video[] = content
        .split('\n')
        .filter((l) => l)
        .map((line) => JSON.parse(line));

    return videos;
};
