import { h } from 'preact';

import './SiteHeader.scss';

export default () => {
    return (
        <header class="site-header">
            <nav class="container site-header__nav">
                <a href="/" class="site-header__link">Home</a>
                <a href="/upload" class="site-header__link">Upload</a>
                {/*<a href="/" class="site-header__link">Home</a>*/}
            </nav>
        </header>
    );
};
