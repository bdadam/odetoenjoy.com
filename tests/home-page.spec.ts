import checkMeta from './check-meta';

describe('Home page', () => {
    it('has correct meta tags', async () => {
        await checkMeta('http://localhost:3000/', {
            canonical: 'https://www.odetoenjoy.com/',
            title: `Beethoven's Ode to Joy in various forms performed by various artists - Ode to Enjoy`,
            h1: `Variations on Beethoven's Ode to Joy`,
            meta: {
                description: `Ode to Joy is Beethoven's most famous music piece. The official hymn of the European Union. It is perfromed in various styles: from calssical through pop to metal`,
            },
        });
    });
});
