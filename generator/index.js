const fs = require('fs-extra');
const marked = require('marked');

const videoPageTemplate = require('./pages/video');
const homePageTemplate = require('./pages/home');

fs.ensureDirSync('dist/videos');

const path = require('path');
const Datastore = require('nedb');
const dbpath = path.resolve(process.cwd(), 'content/videos.nedb');
const videodb = new Datastore({ filename: dbpath, autoload: true });

const writeHtml = require('./services/writeHtml');

const findVideos = () => new Promise((resolve, reject) => {
    videodb.find({}).sort({ index: 1 }).exec((err, videos) => {
        if (err) { return reject(err); }
        resolve(videos);
    });
});

const generatePages = async() => {
    const videos = await findVideos();

    const videoViewModels = videos.map(video => {
        const htmlDescription = marked(video.description || '');
        const shortDescription = (video.description || '').split('\n')[0];
    
        const meta = {
            title: `${video.title} (${video.duration || ''}) | odetoenjoy.com`,
            description: shortDescription,
            canonical: `https://www.odetoenjoy.com/videos/${video.slug}`
        };
    
        return Object.assign(video, {
            htmlDescription,
            shortDescription,
            meta
        });
    });

    generateVideoPages(videoViewModels);
    generateHomePage(videoViewModels);
};

generatePages();

const generateVideoPages = videos => {
    videos.forEach(video => {
        const html = videoPageTemplate(video);
        writeHtml(`dist/videos/${video.slug}.html`, html);
    });
};

const generateHomePage = videos => {
    const html = homePageTemplate({ title: 'TODO', description: 'TODO',  videos });
    return writeHtml(`dist/index.html`, html);
};
