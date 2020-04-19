import fs from 'fs-extra';

import { Video } from 'data/types';

export default async () => {
    const videos: Video[] = fs.readJSONSync('public/videos.min.json');

    return videos;
};
