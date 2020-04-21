import Head from 'next/head';

import { useEffect } from 'react';

import { NextPage } from 'next';
import { trackPageview } from 'src/services/tracking';

const AboutPage: NextPage = () => {
    useEffect(() => {
        trackPageview();
    }, []);

    return (
        <>
            <div className="content">
                <h1 className="page-title">About odetoenjoy.com</h1>

                <p>
                    This site is dedicated to collect music pieces which are variations on Ludwig van Beethoven's Ode to
                    Joy. This ode is definitely one for everyone to enjoy.
                </p>

                <p>
                    This site does not host any of the music videos or music pieces. This site only links to other
                    websites which host the content (e.g. YouTube, SoundCloud, etc.)
                </p>

                <p>This is a private website only created for learning and fun.</p>
            </div>
            <Head>
                <title>About odetoenjoy.com</title>
                <meta name="description" content="Few words about what we do and why we do" />
                <link rel="canonical" href="https://www.odetoenjoy.com/about" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://www.odetoenjoy.com/fb-cover.jpg" />
                <meta property="og:image:width" content="1800" />
                <meta property="og:image:height" content="1197" />
            </Head>
        </>
    );
};

export default AboutPage;
