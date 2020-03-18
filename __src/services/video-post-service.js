import LRU from 'lru-cache';

import crawl from 'metatag-crawler';

const metaDataCache = LRU({ max: 1000, maxAge: 24 * 60 * 60 * 1000 });

export const fetchMetaData = url => new Promise((resolve, reject) => {
    const fromCache = metaDataCache.get(url);
    
    if (fromCache) {
        return resolve(fromCache);
    }

    crawl(url, (err, data) => {
        if (err) {
            return reject(err);
        }

        const obj = {
            url: url,
            title: data.og.title || data.meta.title,
            canonicalUrl: data.meta.canonical || data.og.url,
            videos: data.og.videos,
            // images: data.og.images
            // videos: data.og.videos.filter(v => v.type === 'text/html' || !v.type)
        };

        metaDataCache.set(url, obj);
        resolve(obj);
    });
});

export const postVideo = (url, title, description, tags) => new Promise((resolve, reject) => {

});

export default { fetchMetaData, postVideo };
