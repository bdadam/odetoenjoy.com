import { useEffect } from 'react';

import { NextPage } from 'next';
import { trackPageview } from 'src/services/tracking';

const AboutPage: NextPage = () => {
    useEffect(() => {
        trackPageview('UA-111269764-1');
    }, []);

    return (
        <div className="content">
            <h1 className="page-title">About odetoenjoy.com</h1>

            <p>
                This site is dedicated to collect music pieces which are variations on Ludwig van Beethoven's Ode to
                Joy. This ode is definitely one for everyone to enjoy.
            </p>

            <p>
                This site does not host any of the music videos or music pieces. This site only links to other websites
                which host the content (e.g. YouTube, SoundCloud, etc.)
            </p>
        </div>
    );
};

export default AboutPage;
