import fs from 'fs';
import matter from 'gray-matter';
import speakingurl from 'speakingurl';

const BASE_DIR = 'content/videos';

import { Video } from '../types';

type VideoMatter = Partial<Omit<Video, 'description'>>;

type VideoMd = {
    data: VideoMatter;
    content: string;
};

type ValidVideoMd = VideoMd & { data: { title: string; video: string } };

function isValidVideoMd(md: VideoMd): md is ValidVideoMd {
    if (!md.data.title || md.data.title.length < 10) {
        console.error('Invalid title for', md.data);
        return false;
    }

    if (!md.data.video || !md.data.video.startsWith('https://www.youtube.com/watch?v=')) {
        console.error('Only youtube is supported', md.data.slug);
        return false;
    }

    return true;
}

function readVideosFromMdFiles() {
    const files = fs.readdirSync(BASE_DIR);

    const rawMdVideos = files
        .map((filename) => {
            const raw = fs.readFileSync(`${BASE_DIR}/${filename}`, 'utf-8');
            return matter(raw) as { data: VideoMatter; content: string };
        })
        .filter(isValidVideoMd);

    const videos: Video[] = rawMdVideos.map((x) => {
        return {
            featured: !!x.data.featured,
            title: x.data.title,
            video: x.data.video,
            description: x.content.trim(),
            tags: x.data.tags ?? [],
            slug: x.data.slug || speakingurl(x.data.title, { lang: 'en' }),
            quality: x.data.quality ?? -1,
            // alternativeVideos: x.data.alternativeVideos,
            artists: x.data.artists,

            durationFormatted: '',
            durationSeconds: 0,
            image: undefined,
            thumbnail: undefined,
        };
    });
    return videos;
}

export default readVideosFromMdFiles;
