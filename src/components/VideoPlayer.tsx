import './VideoPlayer.less';
import { useEffect, createRef } from 'react';

import * as YoutubeController from '../services/youtube-player-iframe-controller';

const VideoPlayer: React.FC<{ url: string; img: string }> = ({ url, img }) => {
    const playerElement = createRef<HTMLDivElement>();
    useEffect(() => {
        const videoId = url.substr(-11);
        const controller = YoutubeController.init(
            videoId,
            document.querySelector<HTMLIFrameElement>('#youtube-player-iframe2')!
        );

        // const pos = () => {
        //     if (window.innerWidth >= 1024) {
        //         controller.position(
        //             playerElement.current!.offsetTop,
        //             playerElement.current!.offsetLeft,
        //             playerElement.current!.clientWidth,
        //             playerElement.current!.clientHeight
        //         );
        //     }
        // };

        // pos();

        // window.addEventListener('resize', pos);

        return () => {
            controller.hide();
            // window.removeEventListener('resize', pos);
        };
    }, [url]);

    return (
        <div className="video-player" ref={playerElement}>
            <div className="preview-image-container">
                <img src={img} alt="" className="preview-image" />
            </div>
        </div>
    );
};

export default VideoPlayer;
