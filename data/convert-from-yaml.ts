import { Video } from 'types';

import fs from 'fs-extra';
import yaml from 'js-yaml';
import speakingurl from 'speakingurl';
import matter from 'gray-matter';

type RawVideo = {
    src: string;
    title: string;
    description?: string;
    tags?: string[];
    alternate_videos?: string[];
};

// fs.readdirSync('content/')

const rawVideos: RawVideo[] = yaml.load(fs.readFileSync('content/videos.yaml', 'utf-8'));

fs.ensureDirSync('content/temp-videos-2');
fs.emptyDirSync('content/temp-videos-2');

rawVideos.forEach((rawVideo) => {
    const data = {
        featured: false,
        title: rawVideo.title,
        video: rawVideo.src,
        slug: speakingurl(rawVideo.title, { lang: 'en' }),
        tags: rawVideo.tags ?? [],
        quality: -1,
        alternativeVideos: rawVideo.alternate_videos ?? [],
    };

    const x = matter.stringify(rawVideo.description ?? '', data);

    fs.writeFileSync(`content/temp-videos-2/2020-04-13-${data.slug}.md`, x);
});
