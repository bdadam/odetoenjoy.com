import { h, Component } from 'preact';

import { route } from 'preact-router';

import { crawlUrl } from '../client-api/upload';

const upload = e => {
    e.preventDefault();

    route('/');
};

export default class extends Component {
    
    constructor() {
        super();
        this.state = {
            url: '',
            title: '',
            uploading: false,
            videoEmbdedUrl: ''
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (name === 'url') {
            if (!this.state.url) { return; }
            crawlUrl(this.state.url).then(x => console.log(x));
        //     console.log('paste');
        //     const query = `
        //     query ($url: String!) {
        //         crawlUrl(url: $url) {
        //             title
        //             canonicalUrl
        //             videos {
        //                 url
        //                 type
        //             }
        //         }
        //     }
        // `;

        //     const variables = { url: this.state.url };
        //     const queryURL = `/gql?query=${encodeURIComponent(query)}&variables=${JSON.stringify(variables)}`;

        //     console.log(queryURL);

        //     fetch(queryURL)
        //         .then(response => response.json())
        //         .then(x => {
        //             console.log(x);
        //             this.setState({ videoEmbdedUrl: x.data.crawlUrl.videos[0].url });
        //         });
        }
    }

    submit(e) {
        e.preventDefault();
        console.log(this.state.url);
        console.log(this.state.title);

        this.setState({ uploading: true });

        setTimeout(() => {
            this.setState({ uploading: false });
        }, 1000);
    }

    paste(e) {
        this.handleInputChange(e);
        console.log(this.state);
    }

    render(props, state) {
        return (
            <div class="container">
                { state.videoEmbdedUrl && <iframe src={state.videoEmbdedUrl}></iframe> }
                <form onSubmit={this.submit.bind(this)}>
                    { state.uploading && <div class="form-spinner" /> }
                    <div class="form-row-inline">
                        <label for="upload-url-input">Url</label>
                        <input id="upload-url-input" type="text" value={state.url} name="url" onInput={this.handleInputChange.bind(this)} />
                    </div>
                    {/*<label>
                        Title
                        <input type="text" value={state.title} name="title" onPaste={this.paste.bind(this)} onInput={this.handleInputChange.bind(this)} />
                    </label>*/}

                    <button type="submit">Upload</button>
                </form>
            </div>
        );
    }
}
