const noop = typeof location !== 'object' || location.hostname !== 'www.odetoenjoy.com';

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

const readAndCreateCid = () => {
    try {
        const cid = localStorage.getItem('cid') || uuidv4();
        localStorage.setItem('cid', cid);

        return cid;
    } catch (ex) {
        return 'unknown';
    }
};

export const trackPageview = (tid: string) => {
    const params: Record<string, string> = {
        tid,
        v: '1',
        aip: '1',
        t: 'pageview',
        ds: 'web',
        cid: readAndCreateCid(),
        dr: document.referrer,
        sr: `${window.screen.availWidth}x${window.screen.availHeight}`,
        vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
        sd: `${screen.colorDepth}-bit`,
        de: 'UTF-8',
        dl: document.location.origin + document.location.pathname + document.location.search,
        dt: document.title,
        // @ts-ignore
        ul: navigator.language || navigator.userLanguage,
        z: '' + ((Math.random() * 1e9) | 0),
    };

    if (noop) {
        console.log(params);
        return;
    }

    const query = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&');

    fetch('https://www.google-analytics.com/r/collect?' + query, {
        credentials: 'omit',
        method: 'GET',
        mode: 'no-cors',
    });
};

export const trackEvent = (tid: string, category: string, action: string, label: string) => {
    const params: Record<string, string> = {
        tid,
        v: '1',
        aip: '1',
        t: 'event',
        ds: 'web',
        cid: readAndCreateCid(),
        dr: document.referrer,
        sr: `${window.screen.availWidth}x${window.screen.availHeight}`,
        vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
        sd: `${screen.colorDepth}-bit`,
        de: 'UTF-8',
        dl: document.location.origin + document.location.pathname + document.location.search,
        dt: document.title,
        // @ts-ignore
        ul: navigator.language || navigator.userLanguage,
        z: '' + ((Math.random() * 1e9) | 0),

        ec: category,
        ea: action,
        el: label,
    };

    if (noop) {
        console.log(params);
        return;
    }

    const query = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&');

    fetch('https://www.google-analytics.com/r/collect?' + query, {
        credentials: 'omit',
        method: 'GET',
        mode: 'no-cors',
    });
};
