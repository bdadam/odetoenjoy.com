import Head from 'next/head';

import VideoPlayer from '../../components/VideoPlayer';

export default props => {
    return (
        <>
            <VideoPlayer url={props.embedUrl} img={props.image} />

            <div className="page-container">
                <h1>Video {props.title}</h1>
                <div>{props.description}</div>
            </div>

            <Head>
                <title>
                    {props.title} ({props.duration})
                </title>
                <meta name="description" content={props.description} />
                <link rel="canonical" href={`https://www.odetoenjoy.com/videos/${props.slug}`} />
                <meta property="og:type" content="video.other" />
            </Head>
        </>
    );
};

export const getStaticProps = async ctx => {
    const findAllVideos = require('../../services/find-all-videos').default;
    const slug = ctx.params.slug;
    const videos = await findAllVideos();

    const video = videos.find(v => v.slug === slug);

    return { props: video };

    // console.log('gSP');
    // const fs = require('fs');

    // const yaml = require('js-yaml');
    // const speakingurl = require('speakingurl');

    // const dbyaml = fs.readFileSync('content/videos.yaml');
    // const videos = yaml.load(dbyaml);

    // const slug = ctx.params.slug;

    // const video = videos.find(v => slug === (v.slug || speakingurl(v.title, { lang: 'en' })));

    // console.log(ctx);

    // return { props: video };
};

// import findAllVideos from '../../services/find-all-videos';

export const getStaticPaths = async () => {
    // const fs = require('fs');
    // const speakingurl = require('speakingurl');
    // const yaml = require('js-yaml');
    // const dbyaml = fs.readFileSync('content/videos.yaml');
    // const videos = yaml.load(dbyaml);
    const findAllVideos = require('../../services/find-all-videos').default;

    const videos = await findAllVideos();

    return {
        fallback: false,
        paths: videos.map(v => ({ params: { slug: v.slug } })),
    };

    // videos.map(async (video, index) => {
    //     // const { image, duration, thumbnail, embedUrl } = await crawlVideoPage(video.src);
    //     // video._id = video.slug || speakingurl(video.title, { lang: 'en' });
    //     // video.slug = video._id;
    //     // video.duration = duration;
    //     // video.image = image;
    //     // video.thumbnail = thumbnail;
    //     // video.index = index;
    //     // video.embedUrl = embedUrl;

    //     // videodb.update({ _id: video._id }, video, { upsert: true });
    // });

    console.log(videos);

    return {
        // paths: [{ params: { slug: 'asbcdef' } }],
        paths: videos.map(v => ({ params: { slug: v.slug || speakingurl(v.title, { lang: 'en' }) } })),
        fallback: false,
    };
};
