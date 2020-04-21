import { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import classnames from 'classnames';

import './default.less';

import SiteHeader from '../components/SiteHeader/SiteHeader';
import SiteFooter from '../components/SiteFooter/SiteFooter';

import { init as initTracking } from '../services/tracking';

typeof window === 'object' && initTracking('UA-111269764-1');

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="fb:app_id" content="1771654119806913" />
                {/* <link
                    href="https://fonts.googleapis.com/css?family=Baloo+Thambi+2:400,600&display=swap&subset=latin-ext"
                    rel="stylesheet"
                /> */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#ffc40d" />
                <meta name="theme-color" content="#fffda6" />
            </Head>
            <div className={classnames('app', `page-${pageProps.pagename}`)}>
                <SiteHeader />
                <div className="app-content">
                    <div className="video-player youtube-player" hidden key={'youtube-iframe'}>
                        <div>
                            <iframe
                                frameBorder="0"
                                // referrerPolicy="no-referrer"
                                referrerPolicy="origin"
                                allowFullScreen
                                // TODO: init player with invalid id (src="") so that when opening a video then it can autoplay
                                // src="https://youtube.com/embed/cdwal5Kw3Fc?enablejsapi=1&modestbranding=1" // 1 sec video
                                // sandbox="allow-orientation-lock allow-pointer-lock allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-presentation"
                            />
                        </div>
                    </div>
                    <Component {...pageProps} />
                </div>
                <SiteFooter />
                <div className="modal-container"></div>
            </div>
        </>
    );
}

export default App;
