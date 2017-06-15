import { get } from 'lodash';

export const crawlUrl = url => {
    const query = `
        query ($url: String!) {
            crawlUrl(url: $url) {
                title
                canonicalUrl
                videos {
                    url
                    type
                }
            }
        }
    `;

    const variables = { url };
    const queryURL = `/gql?query=${encodeURIComponent(query)}&variables=${JSON.stringify(variables)}`;

    return fetch(queryURL)
        .then(response => response.json())
        .then(res => {
            // this.setState({ videoEmbdedUrl: x.data.crawlUrl.videos[0].url });
            const data = res.data.crawlUrl;
            console.log(data);
            // const video = data.videos && data.vis
            // return res.data.crawlUrl;
            return {
                title: get(res, 'data.crawlUrl.title', '(no title)'),
                video: get(data, 'videos[0].url')
            };
        });
};
