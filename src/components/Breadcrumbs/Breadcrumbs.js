import { h } from 'preact';

import './Breadcrumbs.scss';

export default ({ links }) => {
    return (
        <nav class="breadcrumbs container">
            <ul class="breadcrumbs__list">
            {
                links.map((lnk, idx, arr) => {
                    const separator = idx < arr.length -1 && <span class="breadcrumbs__separator">&middot;</span>;
                    return <li class="breadcrumbs__item"><a class="breadcrumbs__link" href={lnk.href} title={lnk.title}>{lnk.text}</a>{separator}</li>;
                })
            }
            </ul>
        </nav>
    );
};
