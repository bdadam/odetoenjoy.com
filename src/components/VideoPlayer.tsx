import './VideoPlayer.less';
import { useEffect, createRef } from 'react';

import * as YoutubeController from '../services/youtube-player-iframe-controller';

const VideoPlayer: React.FC<{ url: string; img: string }> = ({ url, img }) => {
    const playerElement = createRef<HTMLDivElement>();
    useEffect(() => {
        const videoId = url.substr(-11);
        const controller = YoutubeController.init(
            videoId,
            document.querySelector<HTMLIFrameElement>('.youtube-player iframe')!
        );

        return () => {
            controller.hide();
        };
    }, [url]);

    return (
        <div className="video-player" ref={playerElement}>
            <img src={img} alt="" className="preview-image" />
        </div>
    );
};

export default VideoPlayer;
