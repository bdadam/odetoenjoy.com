import { JSDOM } from 'jsdom';

type MetaProps = {
    canonical: string;
    title: string;
    h1: string;
    meta: {
        description: string;
    };
};

export default async (url: string, props: MetaProps) => {
    const q = await JSDOM.fromURL(url);
    const doc = q.window.document;

    const charset = doc.charset;
    const canonical = doc.querySelector('link[rel=canonical]')?.getAttribute('href');
    const title = doc.querySelector('title')?.textContent;
    const metaDescription = doc.querySelector('meta[name=description]')?.getAttribute('content');
    const h1 = doc.querySelector('h1')?.textContent;

    expect(charset.toLowerCase()).toEqual('utf-8');
    expect(canonical).toEqual(props.canonical);
    expect(title).toEqual(props.title);
    expect(metaDescription).toEqual(props.meta.description);
    expect(h1).toEqual(props.h1);
};
