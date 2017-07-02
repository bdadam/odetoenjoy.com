import { h } from 'preact';

import VideoList from '../components/VideoList/VideoList';

const VideoDetailsPage = ({ slug }) => {
    const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div>
            <div style="background-color: #000; display: flex; justify-content: center;">
                <div style="width: 800px; height: 350px; background-color: #aaa;"></div>
            </div>
            <div class="container">
                <div class="row">
                    <button>Like</button>
                    <button>Dislike</button>
                    <button>Favorite</button>
                    <button>Watch later</button>
                </div>
                <div class="row">
                    <div class="col">
                        <h1>Details {slug}</h1>
                        <p>Views: 1.234.567</p>
                        <p>Uploaded at: 31 Dec, 2017</p>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi omnis eum cupiditate ab tempore provident, inventore in accusamus eveniet ducimus aliquam eaque beatae repellendus quas voluptate dolore. Dolores, eveniet!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi omnis eum cupiditate ab tempore provident, inventore in accusamus eveniet ducimus aliquam eaque beatae repellendus quas voluptate dolore. Dolores, eveniet!</p>
                        </div>
                    </div>
                </div>

                <hr/>

                <VideoList videos={videos} /> 
            </div>
        </div>
    );
};

export default VideoDetailsPage;
