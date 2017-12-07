const fs = require('fs-extra');
const yaml = require('js-yaml');
const marked = require('marked');
const speakingurl = require('speakingurl');

const videoPageTemplate = require('./pages/video');
const homePageTemplate = require('./pages/home');

fs.ensureDirSync('dist/videos');

const dbyaml = fs.readFileSync('content/videos.yaml');
const videos = yaml.load(dbyaml).map(video => {
    
    const slug = video.slug || speakingurl(video.title, { lang: 'en' });
    const duration = (video.duration || '00-00').replace('-', ':');
    const htmlDescription = marked(video.description || '');
    const shortDescription = (video.description || '').split('\n')[0];

    const meta = {
        title: `${video.title} (${duration || ''}) | odetoenjoy.com`,
        description: shortDescription
    };

    return Object.assign(video, {
        slug,
        htmlDescription,
        shortDescription,
        meta,
        duration
    });
});

const generateVideoPages = videos => {
    videos.forEach(video => {
        const html = videoPageTemplate(video);
        fs.writeFile(`dist/videos/${video.slug}.html`, html, () => {});
    });
};

const generateHomePage = videos => {
    const html = homePageTemplate({ title: 'TODO', description: 'TODO',  videos });
    fs.writeFileSync(`dist/index.html`, html);
};

generateVideoPages(videos);
generateHomePage(videos);

// const path = require('path');
// const util = require('util');
// const frontMatter = require('front-matter');
// const glob = util.promisify(require('glob'));


// const processVideo = filePath => {
//     const content = fs.readFileSync(`content/${filePath}`, 'utf-8');
//     const frontmatter = frontMatter(content);

//     return Object.assign({
//         filePath,
//         basePath: path.dirname(filePath),
//         fileName: path.basename(filePath, '.md')
//     }, frontmatter.attributes, {
//         html: marked(frontmatter.body)
//     });
// };

// const processVideos = filePaths => {
    
//     const model = {
//         videos: filePaths.map(processVideo)
//     };

//     return model;
// };

// const generateVideoPages = (video, all) => {
//     const html = videoPageTemplate({ video, all, meta: { title: 'TITLE', description: 'DESC' } });
//     fs.writeFileSync(`dist/${video.basePath}/${video.fileName}.html`, html);
// };

// const generateFiles = data => {
//     data.videos.forEach(video => generateVideoPages(video, data.videos));
// };

// glob('videos/**/*.md', { cwd: path.resolve(process.cwd(), 'content') }).then(processVideos).then(generateFiles);
