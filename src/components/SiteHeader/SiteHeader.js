import { h } from 'preact';

import './SiteHeader.scss';

export default () => {
    return (
        <header class="site-header">
            <nav class="container">
                <ul class="row">
                    <li class="col-auto"><a href="/" class="site-header__link">Home</a></li>
                    <li class="col-auto"><a href="/upload" class="site-header__link">Upload</a></li>
                    <li class="col-auto"><a class="site-header__link" href="/login">Login</a></li>
                </ul>
            </nav>
        </header>
    );
};
