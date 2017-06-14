import { h } from 'preact';

import './SiteFooter.scss';

export default () => {
    return (
        <footer class="site-footer">
            <div class="container">
                <ul class="site-footer__items">
                    <li>&copy; 2017</li>
                    <li><a href="/legal">Legal notes</a></li>
                </ul>
            </div>
        </footer>
    );
};
