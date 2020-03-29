import './SiteHeader.less';

import Link from 'next/link';

export default () => {
    return (
        <header className="site-header">
            <nav>
                {/* <Link href="/">
                    <a className="site-logo"></a>
                </Link> */}
                <Link href="/">
                    <a>odetoenjoy.com</a>
                </Link>
            </nav>
        </header>
    );
};
