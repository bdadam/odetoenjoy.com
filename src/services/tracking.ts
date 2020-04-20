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

// type State = {
//     firstPageviewAlreadyTracked: boolean;
//     commonParams: Record<string, string | number>;
// };

// const state2: State = {
//     firstPageviewAlreadyTracked: false,
//     commonParams: {},
// };

export const init = (tid: string) => {
    console.log('Init tracking');

    // const { dr, ...paramsWithoutReferrer } = state;

    Object.assign(state, {
        tid,
        cid: readAndCreateCid(),

        v: 1,
        aip: 1,
        ds: 'web',
        dr: document.referrer,
        sr: `${window.screen.availWidth}x${window.screen.availHeight}`,
        vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
        sd: `${screen.colorDepth}-bit`,
        de: document.characterSet,
        // @ts-ignore
        ul: navigator.language || navigator.userLanguage,
    });

    // Object.assign(state2.commonParams, {
    //     tid,
    //     cid: readAndCreateCid(),

    //     v: 1,
    //     aip: 1,
    //     ds: 'web',
    //     dr: document.referrer,
    //     sr: `${window.screen.availWidth}x${window.screen.availHeight}`,
    //     vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
    //     sd: `${screen.colorDepth}-bit`,
    //     de: document.characterSet,
    //     // @ts-ignore
    //     ul: navigator.language || navigator.userLanguage,
    // });
};

const collect = (params: Record<string, string | number>) => {
    if (noop) {
        console.log(params);
        return;
    }

    const query = Object.keys({ ...params, z: '' + ((Math.random() * 1e9) | 0) })
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

    if ('sendBeacon' in navigator) {
        navigator.sendBeacon('https://www.google-analytics.com/r/collect', new Blob([JSON.stringify(params)]));
    } else {
        new Image().src = 'https://www.google-analytics.com/r/collect?' + query;
    }
};

// const createCommonParams = (): Record<string, string> => {
//     return {
//         v: '1',
//         aip: '1',
//         ds: 'web',
//         sr: `${window.screen.availWidth}x${window.screen.availHeight}`,
//         vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
//         sd: `${screen.colorDepth}-bit`,
//         de: document.characterSet,
//         // @ts-ignore
//         ul: navigator.language || navigator.userLanguage,
//         z: '' + ((Math.random() * 1e9) | 0),
//     };
// };

// let dr = typeof document === 'object' ? document.referrer : '';

export const trackPageview = () => {
    collect({
        // ...createCommonParams(),
        ...state,
        t: 'pageview',
        cid: readAndCreateCid(),
        dl: document.location.origin + document.location.pathname + document.location.search,
        dt: document.title,
        // ...(dr ? { dr } : {}),
    });

    // state2.firstPageviewAlreadyTracked = true;

    // In SPAs we don't want to send referrer from the second pageview onwards
    // to avoid session duplication and other weird behavior
    // state.dr = '';
    delete state.dr;
};

// export const trackEvent = (category: string, action: string, label: string, nonInteraction = false) => {
export const trackEvent = (category: string, action: string, { label = '', value = 1, nonInteraction = false }) => {
    collect({
        // ...createCommonParams(),
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

// export const trackError = (tid: string) => {
//     collect({
//         ...createCommonParams(),
//         tid,
//         t: 'exception',
//         cid: readAndCreateCid(),
//     });
// };

// export const getValues = () => {
//     const defaultValues = {
//         v: '1',
//         aip: '1',
//         ds: 'web',
//         sr: `${window.screen.availWidth}x${window.screen.availHeight}`,
//         vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
//         sd: `${screen.colorDepth}-bit`,
//         de: document.characterSet,
//         dr: document.referrer,
//         // @ts-ignore
//         ul: navigator.language || navigator.userLanguage,
//     };

//     return (t: 'pageview' | 'event') => {
//         const val = {
//             ...defaultValues,
//             z: '' + ((Math.random() * 1e9) | 0),
//         };

//         if (t === 'pageview') {
//             defaultValues.dr = '';
//         }

//         return val;
//     };
// };
