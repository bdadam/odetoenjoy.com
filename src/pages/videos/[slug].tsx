import Head from 'next/head';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

import { Video } from 'types';

import findAllVideos from '../../services/find-all-videos';
import VideoPlayer from '../../components/VideoPlayer';
import LikeBox from '../../components/LikeBox/LikeBox';
import VideoItems from '../../components/VideoItems/VideoItems';
import ShareButtons from '../../components/ShareButtons/ShareButtons';
import VideoTags from '../../components/VideoTags/VideoTags';
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

const VideoPage: NextPage<{ video: Video; toplist: Video[]; allVideos: Video[] }> = ({ video, toplist, allVideos }) => {
    // return (
    //     <Page meta={{ title: props.title, description: '', canonicalPath: '/a/b/c' }}>
    //         <VideoPlayer url={props.embedUrl} img={props.image} />
    //         <div className="page-container">
    //             <h1>Video {props.title}</h1>
    //             <div>{props.description}</div>
    //         </div>
    //     </Page>
    // );

    return (
        <>
            <VideoPlayer url={video.embedUrl} img={video.image} />
            <div className="content">
                <h1 className="video-title">{video.title}</h1>
                <ShareButtons title={video.title} url={`https://www.odetoenjoy.com/videos/${video.slug}`} />
                <div className="video-description">{video.description}</div>
                <VideoTags tags={video.tags} />
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
                    {video.title} ({video.duration})
                </title>
                <meta name="description" content={video.description} />
                <link rel="canonical" href={`https://www.odetoenjoy.com/videos/${video.slug}`} />
                <meta property="og:type" content="video.other" />
            </Head>
        </>
    );
};

export default VideoPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
    function shuffle(a: object[]) {
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

    return { props: { video, toplist, allVideos: shuffle([...videos]) } };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const videos = await findAllVideos();

    return {
        fallback: false,
        paths: videos.map((v) => ({ params: { slug: v.slug } })),
    };
};
