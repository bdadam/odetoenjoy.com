import { h } from 'preact';

import './SiteFooter.scss';

export default () => {
    
    const year = new Date().getFullYear();

    return (
        <footer class="site-footer">
            <div class="container">
                <ul class="site-footer__items">
                    <li>&copy; {year}</li>
                    <li><a href="/legal">Legal notes</a></li>
                </ul>
            </div>
        </footer>
    );
};
