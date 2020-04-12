import fs from 'fs-extra';
import matter from 'gray-matter';
import speakingurl from 'speakingurl';

const BASE_DIR = 'content/temp-videos-2';

const files = fs.readdirSync(BASE_DIR);

type Video = {
    title: string;
    video: string;
    durationSeconds: number;
    durationFormatted: string;
    description: string;
    featured: boolean;
    tags: string[];
    slug: string;
    quality: number;
    // alternativeVideos?: string[];
    artists?: [{ name: string; type: string }];
};

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

            duration: '',
            durationSeconds: 0,
        };
    });
    return videos;
}

function formatDuration(seconds: number) {
    const secs = '' + (seconds % 60);
    const mins = '' + (((seconds / 60) | 0) % 60);
    const hrs = '' + ((seconds / 60 / 60) | 0);

    return hrs > '0' ? `${hrs}:${mins.padStart(2, '0')}:${secs.padStart(2, '0')}` : `${mins}:${secs.padStart(2, '0')}`;
}

// const acquireImageForVideo = async (video: Video) => {
//     // video.video
// };

// fs.writeFileSync('content/videos.json', JSON.stringify(videos, null, 4));
// fs.writeFileSync('content/videos.min.json', JSON.stringify(videos));

// videos.forEach(acquireImageForVideo);

import got from 'got';
// const got = (url) => Promise.resolve({ body: 'x' });
import { JSDOM } from 'jsdom';

import parseIsoDuration from 'parse-iso-duration';

async function grabDataFromVideoPage(video: Video): Promise<Video> {
    const cacheDir = '.cache/crawl-response';
    const cacheFile = `${cacheDir}/${video.slug}.html`;
    const fromCache = fs.existsSync(cacheFile);
    const responseBody = fromCache ? await fs.readFile(cacheFile) : (await got(video.video)).body;

    if (!fromCache) {
        fs.ensureDirSync(cacheDir);
        fs.writeFileSync(cacheFile, responseBody);
    }

    const dom = new JSDOM(responseBody);
    const doc = dom.window.document;

    const image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
    const dur = doc.querySelector('meta[itemprop="duration"]')?.getAttribute('content');
    const durationSeconds = dur ? parseIsoDuration(dur!) / 1000 : 0;
    const durationFormatted = formatDuration(durationSeconds);

    return { ...video, durationSeconds, durationFormatted };
}

(async () => {
    const videos = readVideosFromMdFiles();
    const videosWithDurationAndImage = await Promise.all(videos.map(grabDataFromVideoPage));

    fs.writeFileSync('content/videos.json', JSON.stringify(videosWithDurationAndImage, null, 4));
    fs.writeFileSync('content/videos.min.json', JSON.stringify(videosWithDurationAndImage));
})();
