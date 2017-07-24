import VideoPostService from '../../services/video-post-service';

const root = {
    healthcheck: () => {
        return 'OK';
    },
    crawlUrl: (args, ctx) => {
        return VideoPostService.fetchMetaData(args.url);
    },
    test: (args) => {
        return { test: `TEST: ${args.id}` };
    },
    addVideo: (args, ctx) => {
        console.log(args);

        return new Promise((resolve, reject) => {
            resolve({
                id: args.id || '123',
                url: args.videoInput.url || 'sdfdsf',
                title: args.videoInput.title || 'sfdsdfsd'
            });
        });
    }
};

// import { createPreviewFromUrl } from '../services/image-service';

// createPreviewFromUrl('https://i.ytimg.com/vi/fW8amMCVAJQ/hqdefault.jpg').then(x => console.log(x));

// import Video from '../models/video-model';

// Video.create({
//     title: 'TEST',
//     description: 'sdfsfsdf'
// }).then(v => {
//     console.log(v);
// });

// Video.all().then(vids => {
//     console.log(vids);
// });

// Promise.race([fetch('...'), new Promise(resolve => setTimeout(resolve, 2000))]).then(...);

export default root;
