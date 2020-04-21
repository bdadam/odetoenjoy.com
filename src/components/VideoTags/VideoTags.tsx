import './VideoTags.less';

const VideoTags: React.FC<{ tags: string[] | undefined }> = ({ tags }) => {
    if (!tags || tags.length <= 0) {
        return null;
    }

    return (
        <ul className="video-tags">
            {tags.map((tag) => (
                <li key={tag}>{tag}</li>
            ))}
        </ul>
    );
};

export default VideoTags;
