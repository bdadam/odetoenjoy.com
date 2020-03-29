import Head from 'next/head';
import { AppProps } from 'next/app';

import './default.less';

import SiteHeader from '../components/SiteHeader/SiteHeader';
import SiteFooter from '../components/SiteFooter/SiteFooter';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="fb:app_id" content="1771654119806913" />
            </Head>
            <div className="app">
                <SiteHeader />
                <div className="app-content">
                    <div className="youtube-player video-player" hidden>
                        <iframe
                            frameBorder="0"
                            referrerPolicy="no-referrer"
                            allowFullScreen
                            // TODO: init player with invalid id (src="") so that when opening a video then it can autoplay
                            // src="https://youtube.com/embed/unknown?enablejsapi=1&modestbranding=1"
                            // sandbox="allow-orientation-lock allow-pointer-lock allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-presentation"
                        ></iframe>
                    </div>
                    <Component {...pageProps} />
                </div>
                <SiteFooter />
            </div>
        </>
    );
}

export default App;
