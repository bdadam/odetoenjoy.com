const fs = require('fs-extra');
const crypto = require('crypto');

const yaml = require('js-yaml');
const cheerio = require('cheerio');
const bent = require('bent');
const jimp = require('jimp');
const moment = require('moment');
const speakingurl = require('speakingurl');

const path = require('path');
const Datastore = require('nedb');
const dbpath = path.resolve(process.cwd(), 'content/videos.nedb');
const videodb = new Datastore({ filename: dbpath, autoload: true });


// const loadHtml = bent('string', { 'User-Agent': 'Googlebot-Video/1.0' });
// const loadHtml = bent('string', { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' });
const loadHtml = bent('string');
const loadBinary = bent('buffer');

const dbyaml = fs.readFileSync('content/videos.yaml');

const videos = yaml.load(dbyaml);

fs.ensureDirSync('dist/video-images');

// console.log(url.resolve('https://example.com', rawCanonical));

const formatDuration = (hours, minutes, seconds) => {
    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

const crawlVideoPage = async (videoUrl) => {
    const html = await loadHtml(videoUrl);
    const $ = cheerio.load(html);

    // const rawCanonical = $('link[rel=canonical]').attr('href');
    // const canonical = URL.resolve(videoUrl, rawCanonical);
    // const embedUrl = $('');

    const embedUrl = $('meta[property="og:video:url"]').attr('content');
    const imageUrl = $('meta[property="og:image"]').attr('content');
    const durationStr = $('meta[itemprop="duration"]').attr('content');
    
    const duration = moment.duration(durationStr);

    const formattedDuration = formatDuration(duration.hours(), duration.minutes(), duration.seconds());
    const image = await loadBinary(imageUrl);
    const imageFileName = crypto.createHash('md5').update(image).digest('hex');

    const x = await jimp.read(image);
    const thumbnail = await new Promise(resolve => x.background(0x0000000000).contain(480, 270).quality(80).getBuffer('image/jpeg', (err, buf) => resolve(buf)));
    const thumbnailFileName = crypto.createHash('md5').update(thumbnail).digest('hex');

    fs.writeFileSync(`dist/video-images/${imageFileName}.jpg`, image);
    fs.writeFileSync(`dist/video-images/${thumbnailFileName}.jpg`, thumbnail);

    return {
        image: `/video-images/${imageFileName}.jpg`,
        thumbnail: `/video-images/${thumbnailFileName}.jpg`,
        duration: formattedDuration,
        embedUrl
    };
};

Promise.all(videos.map(async (video, index) => {
    const { image, duration, thumbnail, embedUrl } = await crawlVideoPage(video.src);
    video._id = video.slug || speakingurl(video.title, { lang: 'en' });
    video.slug = video._id;
    video.duration = duration;
    video.image = image;
    video.thumbnail = thumbnail;
    video.index = index;
    video.embedUrl = embedUrl;

    videodb.update({ _id: video._id }, video, { upsert: true });
})).then(() => {
    videodb.persistence.compactDatafile();
});
