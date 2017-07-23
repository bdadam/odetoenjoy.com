export default (url, cb) => {
    switch (url) {
        case 'fine-url':
            return setImmediate(() => cb(null, {
                url,
                meta: {
                    canonical: `canonical-${url}`,
                    title: 'Some title',
                    description: 'Some description'
                },
                og: {
                    url: `og-${url}`,
                    title: 'Some og title',
                    description: 'Some og description'
                }
            }));
        default:
            break;
    }
};
