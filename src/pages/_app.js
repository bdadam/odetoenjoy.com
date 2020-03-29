import Head from 'next/head';
import { useEffect } from 'react';

import './default.less';

import SiteHeader from '../components/SiteHeader/SiteHeader';
import SiteFooter from '../components/SiteFooter/SiteFooter';

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="fb:app_id" content="1771654119806913" />
            </Head>
            <div className="app">
                <SiteHeader />
                <div id="youtube-player-iframe">
                    <iframe
                        hidden
                        id="youtube-player-iframe2"
                        frameBorder="0"
                        referrerPolicy="no-referrer"
                        allowFullScreen
                        // sandbox="allow-orientation-lock allow-pointer-lock allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-presentation"
                    ></iframe>
                </div>
                <Component {...pageProps} />
                <SiteFooter />
            </div>
        </>
    );
}

export default App;
