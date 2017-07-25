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
    },
    suggestVideo: (args) => {
        // console.log(args);
        return Promise.resolve({ accepted: true, url: 'blah' });
    },

    // test1: ({ x }) => {
    //     class Test3 {
    //         constructor() {
    //             return 'asqweqw';
    //         }

    //         test3() {
    //             return 'asdad';
    //         }
    //     }
        
    //     class Test2 {
    //         constructor() {}

    //         test2({ y }) {
    //             return new Test3();
    //             return `abc ${y}`;
    //         }
    //     }

    //     return new Test2(x);
    // }

    test1: ({ x }) => {
        
        return { 
            test2({ y }) {
                return {
                    test3() {
                        return `test3: ${x * y}`;
                    }
                };
            }
        };
    }

    // test1: class Test1 {
    //     constructor({ x}) {
    //         console.log(x);
    //     }

    //     test2({ y }) {
    //         console.log(y);
    //     }
    // }
    // test1: ({ x }, b, c) => {
    //     console.log(b, c);
    //     return { test2: 1234 };
    // },
    // Test2: (args) => {
    //     console.log('Test2', args);
    // },
    // test2: ({ y }) => {
    //     console.log(y);
    //     return { test3: 'test3' };
    // }
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
