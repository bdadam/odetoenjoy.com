import './VideoPlayer.less';

export default ({ url, img }) => {
    return (
        <div className="video-player">
            <img src={img} alt="" className="preview-image" />
            <iframe src={url} />
        </div>
    );
};
