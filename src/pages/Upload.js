import { h, Component } from 'preact';

import { crawlUrl } from '../client-api/upload';

import VideoPlayer from '../components/VideoPlayer/VideoPlayer';

import { route } from 'preact-router';

// const upload = e => {
//     e.preventDefault();

//     route('/');
// };

const VideoUrlForm = ({ url, onVideoUrlProvided }) => {
    return (
        <form onSubmit={e => { e.preventDefault(); onVideoUrlProvided(e.target.url.value); }}>
        {/* <form onSubmit={e => { e.preventDefault(); route(`/upload/${encodeURIComponent(e.target.url.value)}`); }}>*/}
            <p>Type or paste a video URL, e.g. https://youtube.com/watch?v=abcdabcd123</p>
            <div class="form-row">
                {/*<label for="upload-url-input">Url</label>*/}
                <input value={url} placeholder="https://" id="upload-url-input" aria-label="URL of the video, e.g. https://youtube.com/watch?v=abcdabcd123" title="URL of the video, e.g. https://youtube.com/watch?v=abcdabcd123" type="text" name="url" />
            </div>
            <button type="submit">Next</button>
        </form>

    );
};

const Spinner = ({ text }) => <div class="spinner">{text}</div>;

const VideoDataEditor = ({ title, description, tags, onTitleChange, onDescriptionChange, onTagsChange }) => {
    return (
        <div>
            <div class="form-row-inline">
                <label>Title</label>
                <input type="text" value={title} onInput={e => onTitleChange(e.target.value)} />
            </div>
            <div class="form-row-inline">
                <label>Description</label>
                <textarea value={description} rows="3" onInput={e => onDescriptionChange(e.target.value)} />
            </div>
            <div class="form-row-inline">
                <label>Tags</label>
                <input value={tags.map(t => t.trim()).join(', ')} type="text" onInput={e => onTagsChange(e.target.value)} />
            </div>
        </div>
    );
};

export default class extends Component {
    
    constructor() {
        super();
        this.state = {
            spinner: false,
            url: '',
            title: '',
            description: '',
            tags: [],
            uploading: false,
            videoEmbedUrl: ''
        };

        this.set = (name, value) => {
            this.setState({ [name]: value });
        };
    }

    onVideoUrlProvided(url) {
        this.setState({ spinner: true, url });
        crawlUrl(url).then(result => {
            this.setState({
                title: result.title,
                videoEmbedUrl: result.video
            });

            this.setState({ spinner: false });            
        });
    }

    render(props, state) {
        return (
            <div class="container">

                <h1 class="heading-1">Upload video from URL</h1>

                { !state.videoEmbedUrl && <VideoUrlForm url={state.url} onVideoUrlProvided={this.onVideoUrlProvided.bind(this)} /> }

                { state.spinner && <Spinner text="Analyzing video URL..." /> }

                { state.videoEmbedUrl &&
                    <div style="max-width: 600px; margin: 0 auto;">
                        <div style="max-width: 360px; margin: 0 auto;">
                            <VideoPlayer url={state.videoEmbedUrl} />
                        </div>

                        <VideoDataEditor embedUrl={state.videoEmbedUrl} title={state.title} description={state.description} tags={state.tags}
                            onTitleChange={t => this.set('title', t)}
                            onDescriptionChange={d => this.set('description', d)}
                            onTagsChange={t => this.setState({ tags: t.split(',') })} />
        
                        <button onClick={() => { this.setState({ videoEmbedUrl : '' }); }}>Back</button>
                        <button>Submit video</button>

                        {/*{ state.videoEmbedUrl && state.title <Upload title={state.title} description={state.description} url={state.url} videoUrl={state.videoEmbedUrl} /> }*/}
                    </div>
                }

            </div>
        );
    }
}
