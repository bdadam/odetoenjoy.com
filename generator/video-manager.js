const fs = require('fs-extra');
const crypto = require('crypto');

const yaml = require('js-yaml');
const cheerio = require('cheerio');
const bent = require('bent');
const jimp = require('jimp');
const moment = require('moment');

// const loadHtml = bent('string', { 'User-Agent': 'Googlebot-Video/1.0' });
// const loadHtml = bent('string', { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' });
const loadHtml = bent('string');
const loadBinary = bent('buffer');

const dbyaml = fs.readFileSync('content/videos.yaml');

const videos = yaml.load(dbyaml);

fs.ensureDirSync('dist/video-images');

// console.log(url.resolve('https://example.com', rawCanonical));

const formatDuration = (hours, minutes, seconds) => {
    return (hours > 0 ? hours : '') + `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const crawlVideoPage = async (videoUrl) => {
    const html = await loadHtml(videoUrl);
    const $ = cheerio.load(html);

    // const rawCanonical = $('link[rel=canonical]').attr('href');
    // const canonical = URL.resolve(videoUrl, rawCanonical);
    // const embedUrl = $('');
    const imageUrl = $('meta[property="og:image"]').attr('content');
    const durationStr = $('meta[itemprop="duration"]').attr('content');
    
    const duration = moment.duration(durationStr);

    const formattedDuration = formatDuration(duration.hours(), duration.minutes(), duration.seconds());
    const image = await loadBinary(imageUrl);
    const imageFileName = crypto.createHash('md5').update(image).digest('hex');

    const x = await jimp.read(image);
    const thumbnail = await new Promise(resolve => x.resize(360, jimp.AUTO).quality(80).getBuffer('image/jpeg', (err, buf) => resolve(buf)));
    const thumbnailFileName = crypto.createHash('md5').update(thumbnail).digest('hex');

    fs.writeFileSync(`dist/video-images/${imageFileName}.jpg`, image);
    fs.writeFileSync(`dist/video-images/${thumbnailFileName}.jpg`, thumbnail);

    return {
        image: `/video-images/${imageFileName}.jpg`,
        thumbnail: `/video-images/${thumbnailFileName}.jpg`,
        duration: formattedDuration
    };
};

videos.forEach(async video => {
    const { image, duration, thumbnail } = await crawlVideoPage(video.src);
    video.duration = duration;
    video.image = image;
    video.thumbnail = thumbnail;

    console.log(video);
});
