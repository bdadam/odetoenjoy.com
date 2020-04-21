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
        return uuidv4();
    }
};

const state: Record<string, string | number> = {};

export const init = (tid: string) => {
    Object.assign(state, {
        tid,
        cid: readAndCreateCid(),

        v: 1,
        aip: 1,
        npa: 1,
        ds: 'web',
        dr: document.referrer,
        sr: `${window.screen.availWidth}x${window.screen.availHeight}`,
        vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
        sd: `${screen.colorDepth}-bit`,
        de: document.characterSet,
        // @ts-ignore
        ul: navigator.language || navigator.userLanguage,
    });
};

const collect = (params: Record<string, string | number>) => {
    if (noop) {
        console.log(params);
        return;
    }

    const paramsWithCacheBusting: typeof params = { ...params, z: '' + ((Math.random() * 1e9) | 0) };

    const query = Object.keys(paramsWithCacheBusting)
        .filter((key) => paramsWithCacheBusting[key] !== null && paramsWithCacheBusting !== undefined)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

    // if ('sendBeacon' in navigator) {
    //     navigator.sendBeacon('https://www.google-analytics.com/r/collect', new Blob([query]));
    // } else {
    new Image().src = 'https://www.google-analytics.com/r/collect?' + query;
    // }
};

export const trackPageview = () => {
    collect({
        ...state,
        t: 'pageview',
        cid: readAndCreateCid(),
        dl: document.location.origin + document.location.pathname + document.location.search,
        dt: document.title,
    });

    // In SPAs we don't want to send referrer from the second pageview onwards
    // to avoid session duplication and other weird behavior
    // state.dr = '';
    delete state.dr;
};

export const trackEvent = (category: string, action: string, { label = '', value = 1, nonInteraction = false }) => {
    collect({
        ...state,

        t: 'event',
        dl: document.location.origin + document.location.pathname + document.location.search,
        dt: document.title,

        ec: category,
        ea: action,
        el: label,
        ev: value,
        ...(nonInteraction ? { ni: '1' } : {}),
    });
};
