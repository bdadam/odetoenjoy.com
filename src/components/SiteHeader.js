import './SiteHeader.less';

import Link from 'next/link';

export default () => {
    return (
        <header className="site-header">
            <Link href="/">
                <a>Home</a>
            </Link>
        </header>
    );
};
