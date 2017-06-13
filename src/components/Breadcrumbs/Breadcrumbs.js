import { h } from 'preact';

import './Breadcrumbs.scss';

export default ({ links }) => {
    return (
        <nav class="breadcrumbs">
            { links.map(lnk => <a class="breadcrumbs__link" href={lnk.href} title={lnk.title}>{lnk.text}</a>) }
        </nav>
    );
};