import Link from 'next/link';

import styles from './SiteHeader.module.css';

import Logo from '../icons/Logo';

export default () => {
    return (
        <header className={styles.siteHeader}>
            <nav>
                {/* <Link href="/">
                    <a className="site-logo"></a>
                </Link> */}

                {/* <span dangerouslySetInnerHTML={{__html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297"><path fill="#ffd42a" d="M28.999 129.957h91.406v91.406H28.999z"/><g transform="translate(-.302 6.065)" fill="#ff2a2a"><path d="M51.048 139.846c9.03 17.146 20.103 15.656 8.286 65.881M99.023 152.006c-11.178-4.934-45.802-8.519-18.842 51.984" stroke="#000" stroke-width=".265"/><ellipse ry="5.279" rx="5.412" cy="138.843" cx="72.23"/><path d="M72.23 133.432c-3.058 0-5.544 2.423-5.544 5.412 0 2.988 2.486 5.41 5.544 5.41 3.06 0 5.543-2.422 5.543-5.41 0-2.989-2.484-5.412-5.543-5.412zm0 .265c2.92 0 5.28 2.305 5.28 5.147s-2.36 5.146-5.28 5.146c-2.919 0-5.28-2.304-5.28-5.146s2.361-5.147 5.28-5.147z" style="line-height:normal;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;text-orientation:mixed;white-space:normal;shape-padding:0;isolation:auto;mix-blend-mode:normal;solid-color:#000;solid-opacity:1" color="#000"overflow="visible"/></g></svg>`}} /> */}

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
