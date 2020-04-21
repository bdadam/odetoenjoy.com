import Link from 'next/link';
import classnames from 'classnames';

import './VideoItems.less';

type Video = {
    title: string;
    slug: string;
    thumbnail: { url: string };
    durationFormatted: string;
};

const VideoItems: React.FC<{ videos: Video[]; modifier?: 'small' }> = ({ videos, modifier }) => {
    return (
        <ul className={classnames('video-items', { 'video-items--small': modifier === 'small' })}>
            {videos.map((v) => (
                <li key={v.slug} className="video-item">
                    <Link href="/videos/[slug]" as={`/videos/${v.slug}`}>
                        <a className="video-item__card">
                            <div className="video-item__picture-frame">
                                <img src={v.thumbnail.url} alt="" />
                                <span className="video-item__duration">{v.durationFormatted}</span>
                            </div>

                            <div className="video-item__content">
                                <p className="video-item__title">{v.title}</p>
                            </div>
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default VideoItems;
