import Link from 'next/link';

import './SiteHeader.less';

import Logo from '../icons/Logo';

export default () => {
    return (
        <header className="site-header lg:mb-20">
            <nav>
                <div
                    style={{
                        display: 'inline-block',
                        width: 32,
                        height: 32,
                        borderRadius: 3,
                        overflow: 'hidden',
                        marginRight: 12,
                    }}
                >
                    <Logo />
                </div>

                <Link href="/">
                    <a>odetoenjoy.com</a>
                </Link>
            </nav>
        </header>
    );
};
