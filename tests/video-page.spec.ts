import checkMeta from './check-meta';

describe('Home page', () => {
    it('has correct meta tags', async () => {
        await checkMeta(
            'http://localhost:3000/videos/chicago-symphony-orchestra-with-riccardo-muti-beethoven-s-9th-symphony',
            {
                canonical:
                    'https://www.odetoenjoy.com/videos/chicago-symphony-orchestra-with-riccardo-muti-beethoven-s-9th-symphony',
                title: `Chicago Symphony Orchestra with Riccardo Muti - Beethoven's 9th Symphony (1:21:23)`,
                h1: `Chicago Symphony Orchestra with Riccardo Muti - Beethoven's 9th Symphony`,
                meta: {
                    // @ts-ignore
                    description: null,
                },
            }
        );
    });
});
