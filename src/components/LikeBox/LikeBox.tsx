import { createRef, useEffect } from 'react';

const LikeBox: React.FC<{}> = () => {
    const iframe = createRef<HTMLIFrameElement>();
    const height = 200;

    useEffect(() => {
        const width = window.getComputedStyle(iframe.current!, null).getPropertyValue('width');
        iframe.current!.src = `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fodetoenjoy%2F&atabs=messages&width=${width}&height=${height}&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=2241648436114870`;
    }, []);

    return (
        <iframe
            ref={iframe}
            scrolling="no"
            frameBorder="0"
            data-allowtransparency
            allow="encrypted-media"
            style={{ border: 0, overflow: 'hidden', width: '100%', height: `${height}px` }}
        ></iframe>
    );
};

export default LikeBox;
