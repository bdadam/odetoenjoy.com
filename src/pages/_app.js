import Head from 'next/head';
import { useEffect } from 'react';

import './default.less';

import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter/SiteFooter';

function App({ Component, pageProps }) {
    useEffect(() => {
        // TODO: init youtube player here
    }, []);
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="fb:app_id" content="1771654119806913" />
            </Head>
            <SiteHeader />
            <Component {...pageProps} />
            <SiteFooter />
        </>
    );
}

export default App;
