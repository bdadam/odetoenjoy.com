const siteHeader = require('../components/site-header');
const siteFooter = require('../components/site-footer');

module.exports = (video) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${video.meta.title}</title>
    <meta name="description" content="${video.meta.description}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/static/main.css">
    <script src="/static/main.js" defer></script>
</head>
<body>
    ${siteHeader({ backlink: { href: '/', text: 'Home' } })}

    <main>
        <video-player class="video-player" src="" autoplay></video-player>
        <h1 class="video-title">${video.title}</h1>
        
        <div class="video-description">

            <div class="markdown-generated">
                ${video.htmlDescription}
            </div>

            <div class="sharing-buttons">
                <a href="">Fb</a>
                <a href="">Tw</a>
                <a href="mailto:">E-mail</a>
            </div>
        </div>
    </main>

    ${siteFooter()}
</body>
</html>
`;
