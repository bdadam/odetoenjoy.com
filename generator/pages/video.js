const siteHeader = require('../components/site-header');
const siteFooter = require('../components/site-footer');
const tracking = require('../components/tracking.js');

module.exports = (video) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${video.meta.title}</title>
    <meta name="description" content="${video.meta.description}">
    
    <meta property="fb:app_id" content="1771654119806913">
    <meta property="og:title" content="${video.title}">
    <meta property="og:description" content="${video.meta.description}">
    <meta property="og:type" content="video.other">
    <meta property="og:url" content="${video.meta.canonical}">
    <meta property="og:image" content="https://www.odetoenjoy.com${video.thumbnail}">
    <meta property="og:image:width" content="480">
    <meta property="og:image:height" content="270">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="canonical" href="${video.meta.canonical}">
    <link rel="stylesheet" href="/static/main.css?1">
    <script src="/static/main.js?1" defer></script>
</head>
<body>
    ${siteHeader({ backlink: { href: '/', text: 'Home' } })}

    <svg style="display: none;">
        <symbol id="icon-facebook" viewBox="0 0 32 32">
            <title>Facebook</title>
            <path d="M29 0h-26c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h13v-14h-4v-4h4v-2c0-3.306 2.694-6 6-6h4v4h-4c-1.1 0-2 0.9-2 2v2h6l-1 4h-5v14h9c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3z"></path>
        </symbol>
        <symbol id="icon-twitter" viewBox="0 0 32 32">
            <title>Twitter</title>
            <path d="M32 7.075c-1.175 0.525-2.444 0.875-3.769 1.031 1.356-0.813 2.394-2.1 2.887-3.631-1.269 0.75-2.675 1.3-4.169 1.594-1.2-1.275-2.906-2.069-4.794-2.069-3.625 0-6.563 2.938-6.563 6.563 0 0.512 0.056 1.012 0.169 1.494-5.456-0.275-10.294-2.888-13.531-6.862-0.563 0.969-0.887 2.1-0.887 3.3 0 2.275 1.156 4.287 2.919 5.463-1.075-0.031-2.087-0.331-2.975-0.819 0 0.025 0 0.056 0 0.081 0 3.181 2.263 5.838 5.269 6.437-0.55 0.15-1.131 0.231-1.731 0.231-0.425 0-0.831-0.044-1.237-0.119 0.838 2.606 3.263 4.506 6.131 4.563-2.25 1.762-5.075 2.813-8.156 2.813-0.531 0-1.050-0.031-1.569-0.094 2.913 1.869 6.362 2.95 10.069 2.95 12.075 0 18.681-10.006 18.681-18.681 0-0.287-0.006-0.569-0.019-0.85 1.281-0.919 2.394-2.075 3.275-3.394z"></path>
        </symbol>
        <symbol id="icon-email" viewBox="0 0 32 32">
            <title>E-mail</title>
            <path d="M29 4h-26c-1.657 0-3 1.343-3 3v18c0 1.656 1.343 3 3 3h26c1.657 0 3-1.344 3-3v-18c0-1.657-1.343-3-3-3zM2.741 25.99l-0.731-0.732 8.249-8.248 0.731 0.732-8.249 8.248zM29.259 25.99l-8.249-8.248 0.731-0.732 8.249 8.248-0.731 0.732zM17 19.325v0.675h-2v-0.675l-12.997-12.050 1.272-1.272 12.725 11.798 12.725-11.798 1.272 1.272-12.997 12.050z"></path>
        </symbol>
        <symbol id="icon-arrow-left" viewBox="0 0 32 32">
            <title>arrow-left</title>
            <path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
        </symbol>
    </svg>


    <main>
        <video-player class="video-player" embed-url="${video.embedUrl}" src="" autoplay xstyle="background-image: url(${video.image}); background-repeat: no-repeat; background-size: cover; background-position: center center;">
            <div class="loader"></div>
        </video-player>
      
        <section class="content-section">
            <h1 class="video-title">${video.title}</h1>
            <div class="video-description markdown-generated">
                ${video.htmlDescription}
            </div>
        </section>

        <section class="content-section sharing-buttons">
            <a class="share-button share-button--facebook" title="Share on Facebook" target="_blank" rel="external noopener" href="http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(video.meta.canonical)}">
                <svg class="icon"><use xlink:href="#icon-facebook"></use></svg>
                Facebook
            </a>
            <a class="share-button share-button--twitter" title="Share on Twitter" target="_blank" rel="external noopener" href="http://twitter.com/share?url=${encodeURIComponent(video.meta.canonical)}&text=${video.title}">
                <svg class="icon"><use xlink:href="#icon-twitter"></use></svg>
                Twitter
            </a>
            <a class="share-button share-button--email" title="Share by e-mail" href="mailto:?subject=${video.meta.title}&body=${encodeURIComponent(video.meta.canonical)}">
                <svg class="icon"><use xlink:href="#icon-email"></use></svg>
                Email
            </a>
        </section>

        <div class="content-section">
            <h2 class="headline-2">Recommended videos</h2>
            <ul class="video-list">
            ${video.recommendedVideos.filter(v => v.slug !== video.slug).map(video => `
                <li class="video-list__item">
                    <a class="video-card" href="/videos/${video.slug}.html" title="${video.title}">
                        <div class="video-card__image" style="background-image: url(${video.thumbnail});" data-duration="${video.duration}"></div>
                        <h2 class="video-card__title">${video.title}</h2>
                    </a>
                </li>            
            `).join('')}
            </ul>
        </div>
    </main>

    ${siteFooter()}
    ${tracking()}
</body>
</html>
`;
