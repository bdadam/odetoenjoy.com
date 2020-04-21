import Head from 'next/head';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

import { Video } from 'data/types';

import findAllVideos from '../../services/find-all-videos';
import VideoPlayer from '../../components/VideoPlayer';
import LikeBox from '../../components/LikeBox/LikeBox';
import VideoItems from '../../components/VideoItems/VideoItems';
import ShareButtons from '../../components/ShareButtons/ShareButtons';
import VideoTags from '../../components/VideoTags/VideoTags';
import { useEffect } from 'react';
import { trackPageview } from 'src/services/tracking';
// const Page = props => {
//     return (
//         <>
//             <Head>
//                 <title>{props.title}</title>
//                 <meta name="description" content={props.description} />
//                 <link rel="canonical" href={`https://www.odetoenjoy.com${props.canonicalPath}`} />
//                 {props.og?.type && <meta property="og:type" content={props.og.type} />}
//             </Head>
//             {props.children}
//         </>
//     );
// };

type VideoPageProps = { pagename: 'video'; video: Video; toplist: Video[]; allVideos: Video[] };

const VideoPage: NextPage<VideoPageProps> = ({ video, toplist, allVideos }) => {
    // return (
    //     <Page meta={{ title: props.title, description: '', canonicalPath: '/a/b/c' }}>
    //         <VideoPlayer url={props.embedUrl} img={props.image} />
    //         <div className="page-container">
    //             <h1>Video {props.title}</h1>
    //             <div>{props.description}</div>
    //         </div>
    //     </Page>
    // );

    useEffect(() => {
        trackPageview();
    }, [video.slug]);

    return (
        <>
            <VideoPlayer
                url={video.video.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')}
                img={video.image.url}
                title={video.title}
            />
            <div className="content">
                {/* <iframe src="https://youtube.com/embed/cdwal5Kw3Fc?enablejsapi=1&modestbranding=1" /> */}
                <h1 className="headline-1 mb-12 mt-12">{video.title}</h1>
                <ShareButtons title={video.title} url={`https://www.odetoenjoy.com/videos/${video.slug}`} />
                <div className="whitespace-pre-wrap mb-12">{video.description}</div>
                <div className="mb-12">
                    <VideoTags tags={video.tags} />
                </div>
                {/* <hr /> */}
                {/* <h2>More videos</h2> */}
                <VideoItems videos={allVideos} />
            </div>
            <div className="sidebar">
                <LikeBox />
                <VideoItems videos={toplist} modifier="small" />
            </div>

            <Head>
                <title>
                    {video.title} ({video.durationFormatted})
                </title>
                <meta name="description" content={video.description} />
                <link rel="canonical" href={`https://www.odetoenjoy.com/videos/${video.slug}`} />
                <meta property="og:type" content="video.other" />
                <meta property="og:image" content={`https://www.odetoenjoy.com${video.image.url}`} />
                <meta property="og:image:width" content={'' + video.image.width} />
                <meta property="og:image:height" content={'' + video.image.height} />
            </Head>
        </>
    );
};

export default VideoPage;

export const getStaticProps: GetStaticProps<VideoPageProps> = async (ctx) => {
    function shuffle<P>(a: P[]) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    const slug = ctx.params!.slug;

    const videos = await findAllVideos();
    const video = videos.find((v) => v.slug === slug)!;

    const toplist = [
        videos.find((v) => v.slug === 'chicago-symphony-orchestra-with-riccardo-muti-beethoven-s-9th-symphony')!,
        videos.find((v) => v.slug === 'ode-to-joy-rock-version-nobel-peace-prize-award-ceremony-2012')!,
        videos.find((v) => v.slug === 'ode-to-joy-flashmob-at-plaza-sabadel-spain')!,
        videos.find((v) => v.slug === 'albano-carrisi-aka-al-bano-canto-alla-gioia')!,
        videos.find((v) => v.slug === 'joyful-joyful-we-adore-thee')!,
    ];

    return { props: { pagename: 'video', video, toplist, allVideos: shuffle([...videos]) } };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const videos = await findAllVideos();

    return {
        fallback: false,
        paths: videos.map((v) => ({ params: { slug: v.slug } })),
    };
};
