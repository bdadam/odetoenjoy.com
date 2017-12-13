const siteHeader = require('../components/site-header');
const siteFooter = require('../components/site-footer');
const homeHero = require('../components/home-hero');

module.exports = (model) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${model.title}</title>
    <meta name="description" content="${model.description}">
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
                        ${video.shortDescription}
                    </a>
                </li>            
            `).join('')}
        </ul>
    </main>

    ${siteFooter()}
</body>
</html>
`;
