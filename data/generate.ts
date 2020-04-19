import fs from 'fs-extra';

import readVideosFromMdFiles from './services/read-videos-from-md';

type Image = {
    url: string;
    width: number;
    height: number;
};

type Video = {
    title: string;
    video: string;
    image?: Image;
    thumbnail?: Image;
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

function formatDuration(seconds: number) {
    const secs = '' + (seconds % 60);
    const mins = '' + (((seconds / 60) | 0) % 60);
    const hrs = '' + ((seconds / 60 / 60) | 0);

    return hrs > '0' ? `${hrs}:${mins.padStart(2, '0')}:${secs.padStart(2, '0')}` : `${mins}:${secs.padStart(2, '0')}`;
}

import got from 'got';
import { JSDOM, DOMWindow } from 'jsdom';

import parseIsoDuration from 'parse-iso-duration';

function parseDuration(win: DOMWindow) {
    try {
        const doc = win.document;
        const dur = doc.querySelector('meta[itemprop="duration"]')?.getAttribute('content');
        const durationSeconds = dur ? parseIsoDuration(dur!) / 1000 : 0;
        const durationFormatted = formatDuration(durationSeconds);

        return { durationSeconds, durationFormatted };
    } catch (e) {
        console.error('Error retrieving duration', window.location.href);

        return { durationSeconds: 0, durationFormatted: '' };
    }
}

import sharp from 'sharp';
import crypto from 'crypto';

const readOriginalImage = async (url: string, file: string) => {
    if (fs.existsSync(file)) {
        return fs.readFile(file);
    }

    const buffer = await got(url, { responseType: 'buffer', resolveBodyOnly: true });
    fs.writeFileSync(file, buffer);

    return buffer;
};

async function resizeImage(
    image: Buffer,
    width: number,
    outFile: string,
    quality = 70
): Promise<{ width: number; height: number }> {
    const img = sharp(image)
        // .resize(width, Math.ceil((width / 16) * 9), { fit: 'cover' })
        .resize(width)
        .withMetadata()
        .jpeg({ quality });
    const meta = await img.metadata();

    await fs.writeFile(outFile, await img.toBuffer());

    return { width: meta.width!, height: meta.height! };
}

async function getImages(win: DOMWindow, slug: string): Promise<{ image: Image; thumbnail: Image }> {
    const doc = win.document;
    const imgUrl = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');

    if (!imgUrl) {
        return {
            image: { url: 'https://via.placeholder.com/1280x720', width: 1280, height: 720 },
            thumbnail: { url: 'https://via.placeholder.com/480x270', width: 480, height: 270 },
        };
    }

    const hash = crypto.createHash('md5').update(imgUrl!).digest('hex').substr(0, 6);
    const imageBaseDir = `public/video-images2`;
    fs.ensureDirSync(imageBaseDir);

    const imageFileOriginal = `${imageBaseDir}/${slug}-${hash}-original.jpg`;

    const original = await readOriginalImage(imgUrl, imageFileOriginal);
    const image = sharp(original);
    const metadata = await image.metadata();

    const needToGenerateSmallImage = metadata.width! > 480;

    const large = {
        url: imageFileOriginal.replace('public/', '/'),
        width: metadata.width!,
        height: metadata.height!,
    };

    const thumbnail = large;

    if (needToGenerateSmallImage) {
        const imageFileSmall = `${imageBaseDir}/${slug}-${hash}-360.jpg`;
        const { width, height } = await resizeImage(original, 480, imageFileSmall, 75);

        thumbnail.width = width;
        thumbnail.height = height;
        thumbnail.url = imageFileSmall.replace('public/', '/');
    }

    return { image: large, thumbnail };
}

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

    return { ...video, ...parseDuration(dom.window), ...(await getImages(dom.window, video.slug)) };
}

(async () => {
    console.log('Started...');

    console.log('Reading videos from *.md files');
    const videos = readVideosFromMdFiles();

    console.log('Getting duration and images');
    const videosWithDurationAndImage = await Promise.all(videos.map(grabDataFromVideoPage));

    // console.log(videosWithDurationAndImage);

    console.log('Writing json files');
    fs.writeFileSync('content/videos.json', JSON.stringify(videosWithDurationAndImage, null, 4));
    fs.writeFileSync('content/videos.min.json', JSON.stringify(videosWithDurationAndImage));

    console.log('Done.');
})();
