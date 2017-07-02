import { h } from 'preact';

import List from '../components/VideoList/VideoList';

const VideoListPage = () => {
    const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div class="container" style="margin-top: 24px;">
            
            <form class="row">
                <div class="col" style="text-align: center;">
                    <input type="text" />
                    <button type="submit">Search</button>
                </div>
            </form>

            <List videos={videos} />
        </div>
    ); 
};

export default VideoListPage;
