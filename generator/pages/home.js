const siteHeader = require('../components/site-header');
const siteFooter = require('../components/site-footer');
const homeHero = require('../components/home-hero');
const tracking = require('../components/tracking.js');

module.exports = (model) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${model.title}</title>
    <meta name="description" content="${model.description}">

    <meta property="fb:app_id" content="1771654119806913">
    <meta property="og:title" content="${model.title}">
    <meta property="og:description" content="${model.description}">
    <meta property="og:type" content="website">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/static/main.css?1">
    <script src="/static/main.js?1" defer></script>
</head>
<body>
    ${siteHeader()}
    ${'' && homeHero()}
    
    <main>
        <ul class="content-section video-list">
            ${model.videos.map(video => `
                <li class="video-list__item">
                    <a class="video-card" href="/videos/${video.slug}.html" title="${video.title}">
                        <div class="video-card__image" style="background-image: url(${video.thumbnail});" data-duration="${video.duration}"></div>
                        <h2 class="video-card__title">${video.title}</h2>
                    </a>
                </li>            
            `).join('')}
        </ul>
    </main>

    ${siteFooter()}
    ${tracking()}
</body>
</html>
`;
