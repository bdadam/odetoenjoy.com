import { h } from 'preact';

const VideoItem = ({ title }) => {
    return (
        <div style="border: 1px solid #dedede; padding: 8px; border-radius: 3px;">
            <a href="/videos/video-title-maybe-id-123456" style="display: block;">
                <div style="background-color: #aaa; padding-bottom: 56.25%;"></div>
                <div style="padding: 8px 0; border-bottom: 1px solid #dedede; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="Title Lorem Ipsum dolor blah blah blubb">Title Lorem Ipsum dolor blah blah blubb</div>
            </a>
            <div style="padding: 8px 0 0;">
                <span style="font-size: 0.875rem;">8.345.123 views</span>
                {/*<button>Add to playlist</button>*/}
                {/*<button>Watch this</button>*/}
                {/*<button>Watch it later</button>*/}
            </div>
        </div>
    );
};

const VideoListPage = ({ videos }) => (
    <ul class="row">
        {
            videos.map(() => <li style="margin-bottom: 12px;" class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><VideoItem /></li>)
        }
    </ul>
);

export default VideoListPage;
