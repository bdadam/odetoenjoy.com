module.exports = (model = {}) => `
<header class="site-header">
    <svg style="display: none;">
        <symbol id="icon-arrow-left" viewBox="0 0 32 32">
            <title>arrow-left</title>
            <path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
        </symbol>
    </svg>

    <div class="site-header__container">
        ${
    model.backlink
        ? `<a href="${model.backlink.href}" class="site-header__back-button">
            <svg class="icon"><use xlink:href="#icon-arrow-left"></use></svg>
        </a>`
        : ''
}
        
        <nav class="site-navigation">
            <a class="site-navigation__link" href="/">odetoenjoy.com</a>
        </nav>
    </div>
</header>
`;
