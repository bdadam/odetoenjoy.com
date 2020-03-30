import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPageContext } from 'next';

import './index.less';

import { Video } from 'types';

import findAllVideos from '../services/find-all-videos';
import readLyrics from '../services/read-lyrics';

type HomePageProps = {
    videos: Video[];
    lyrics: {
        de: string;
        en: string;
    };
    toplist: Video[];
};

import LikeBox from '../components/LikeBox/LikeBox';
import VideoItems from '../components/VideoItems/VideoItems';

const Home: React.FC<HomePageProps> = ({ videos, toplist, lyrics }) => {
    return (
        <>
            <Head>
                <title>Beethoven's Ode to Joy in various forms performed by various artists - Ode to Enjoy</title>
                <meta
                    name="description"
                    content="Ode to Joy is Beethoven's most famous music piece. The official hymn of the European Union. It is perfromed in numerous styles, from calssical to metal"
                />
                <link rel="canonical" href="https://www.odetoenjoy.com/" />
            </Head>

            <h1 className="page-title">Variations on Beethoven's Ode to Joy</h1>
            <div className="content">
                <VideoItems videos={videos} />

                {/* <ul className="video-items">
                    {videos.map(v => (
                        <li key={v.slug} className="video-item">
                            <Link href="/videos/[slug]" as={`/videos/${v.slug}`}>
                                <a className="card">
                                    <div className="picture-frame">
                                        <img src={v.thumbnail} />
                                        <span className="duration">{v.duration}</span>
                                    </div>

                                    <div className="content">
                                        <p className="title">{v.title}</p>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="video-top-list">
                    {toplist
                        .filter((_, idx) => idx < 1)
                        .map(v => (
                            <li key={v.slug}>
                                <Link href="/videos/[slug]" as={`/videos/${v.slug}`}>
                                    <a className="video-top-list__item">
                                        <div className="picture" style={{ backgroundImage: `url("${v.thumbnail}")` }} />
                                        <div className="content">
                                            <p className="title">{v.title}</p>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                        ))}
                </ul>

                <ul className="video-list">
                    {videos.map(v => (
                        <li key={v.slug}>
                            <Link href="/videos/[slug]" as={`/videos/${v.slug}`}>
                                <a className="video-list__item">
                                    <div className="picture" style={{ backgroundImage: `url("${v.thumbnail}")` }} />
                                    <div className="content">
                                        <p className="title">{v.title}</p>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="video-grid">
                    {videos.map(v => (
                        <li key={v.slug}>
                            <Link href="/videos/[slug]" as={`/videos/${v.slug}`}>
                                <a className="video-grid-item">
                                    <div className="image-169" style={{ backgroundImage: `url("${v.thumbnail}")` }} />
                                    <div className="card-content">
                                        <p className="title bold">{v.title}</p>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul> */}

                <div className="body-text">
                    <h2>Ode to Joy (An die Freude)</h2>

                    <p>
                        The "Ode to Joy" (German: "An die Freude") is an ode written by German poet Friedrich Schiller.
                        The ode was written in the summer of 1785 and published a year later in a German magazin called
                        Thalia.
                    </p>
                    <p>
                        Beethoven's Ode to Joyis truly world famous. It is among many things the official hymn of the
                        European Union. It is perfromed in numerous styles, from calssical to metal.
                    </p>

                    <div className="lyrics-container">
                        <div>
                            <h3 className="mb-20 mt-20">Ode to Joy</h3>
                            <div className="pre-wrap" dangerouslySetInnerHTML={{ __html: lyrics.en }}></div>
                        </div>

                        <div>
                            <h3 className="mb-20 mt-20">Ode an die Freude</h3>
                            <div className="pre-wrap" dangerouslySetInnerHTML={{ __html: lyrics.de }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar">
                <LikeBox />
            </div>
        </>
    );
};

export default Home;

export const getStaticProps = async (ctx: NextPageContext): Promise<{ props: HomePageProps }> => {
    const videos = await findAllVideos();

    const lyrics = await Promise.all([
        await readLyrics('content/lyrics/an-die-freude.txt'),
        await readLyrics('content/lyrics/ode-to-joy.txt'),
    ]);

    const toplist = [
        videos.find(v => v.slug === 'chicago-symphony-orchestra-with-riccardo-muti-beethoven-s-9th-symphony'),
        videos.find(v => v.slug === 'ode-to-joy-rock-version-nobel-peace-prize-award-ceremony-2012'),
        videos.find(v => v.slug === 'ode-to-joy-flashmob-at-plaza-sabadel-spain'),
        videos.find(v => v.slug === 'albano-carrisi-aka-al-bano-canto-alla-gioia'),
        videos.find(v => v.slug === 'joyful-joyful-we-adore-thee'),
    ] as Video[];

    return { props: { videos, toplist, lyrics: { de: lyrics[0].html, en: lyrics[1].html } } };
};
