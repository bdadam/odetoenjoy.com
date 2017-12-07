module.exports = (model = {}) => `
<header class="site-header">
    ${model.backlink ? `<a href="${model.backlink.href}" class="site-header__back-button">${model.backlink.text}</a>` : '' }
    
    <nav class="site-navigation">
        <a class="site-navigation__link" href="/">odetoenjoy.com</a>
    </nav>
</header>
`;
