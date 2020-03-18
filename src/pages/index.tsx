import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import findAllVideos from '../services/find-all-videos';
import { Video } from 'types';
import { NextPageContext } from 'next';

type HomePageProps = {
    videos: Video[];
    lyrics: {
        de: string;
        en: string;
    };
};

const Home: React.FC<HomePageProps> = ({ videos, lyrics }) => {
    return (
        <div className="page-container">
            <Head>
                <title>Beethoven's Ode to Joy in various forms performed by various artists - Ode to Enjoy</title>
                <meta
                    name="description"
                    content="Ode to Joy is Beethoven's most famous music piece. The official hymn of the European Union. It is perfromed in numerous styles, from calssical to metal"
                />
                <link rel="canonical" href="https://www.odetoenjoy.com/" />
            </Head>

            <h1 className="page-title">Variations on Beethoven's Ode to Joy</h1>

            {/* <button className="btn-primary">Hello</button> */}

            <ul className="video-grid">
                {videos.map(v => (
                    <li key={v.slug}>
                        <Link href="/videos/[slug]" as={`/videos/${v.slug}`}>
                            <a className="video-grid-item">
                                {/* <img src={v.thumbnail} /> */}
                                <div className="image-169" style={{ backgroundImage: `url("${v.thumbnail}")` }} />
                                <p className="title bold">{v.title}</p>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>

            <div>
                <iframe
                    scrolling="no"
                    frameBorder="0"
                    allowTransparency
                    allow="encrypted-media"
                    style={{ border: 0, overflow: 'hidden', width: '100%', height: '300px' }}
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fodetoenjoy%2F&amp;tabs=messages&amp;width=280&amp;height=300&amp;small_header=true&amp;adapt_container_width=true&amp;hide_cover=true&amp;show_facepile=true&amp;appId=2241648436114870"
                ></iframe>
            </div>

            <div className="body-text">
                <h2>Ode to Joy (An die Freude)</h2>
                <p>
                    The "Ode to Joy" (German: "An die Freude") is an ode written by German poet Friedrich Schiller. The
                    ode was written in the summer of 1785 and published a year later in a German magazin called Thalia.
                </p>
                <p>
                    Beethoven's Ode to Joyis truly world famous. It is among many things the official hymn of the
                    European Union. It is perfromed in numerous styles, from calssical to metal.
                </p>

                <h2>English Lyrics</h2>
                <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: lyrics.en }}></div>

                <h2>German Lyrics</h2>
                <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: lyrics.de }}></div>
            </div>
        </div>
    );
};

export default Home;

import readLyrics from '../services/read-lyrics';

export const getStaticProps = async (ctx: NextPageContext): Promise<{ props: HomePageProps }> => {
    const videos = await findAllVideos();

    // const lyricsDEraw = await fs.promises.readFile('content/lyrics/an-die-freude.txt', 'utf-8');

    // const lyricsDE = lyricsDEraw.replace('\n', '<br />');

    const lyrics = await Promise.all([
        await readLyrics('content/lyrics/an-die-freude.txt'),
        await readLyrics('content/lyrics/ode-to-joy.txt'),
    ]);

    return { props: { videos, lyrics: { de: lyrics[0].html, en: lyrics[1].html } } };
};
