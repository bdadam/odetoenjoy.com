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
            return {
                title: get(res, 'data.crawlUrl.title', '(no title)'),
                video: get(res, 'data.crawlUrl.videos[0].url')
            };
        });
};
