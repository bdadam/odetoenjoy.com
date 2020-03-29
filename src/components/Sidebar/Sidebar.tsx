import { createRef, useEffect, IframeHTMLAttributes, Children } from 'react';

const Sidebar: React.FC<{}> = ({ children }) => {
    const iframe = createRef<HTMLIFrameElement>();
    const sidebar = createRef<HTMLDivElement>();

    useEffect(() => {
        const width = sidebar.current!.clientWidth;
        iframe.current!.width = '' + width;
        iframe.current!.src = `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fodetoenjoy%2F&atabs=messages&width=${width}&height=300&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=2241648436114870`;
    }, []);

    return (
        <div className="sidebar" ref={sidebar}>
            <iframe
                ref={iframe}
                scrolling="no"
                frameBorder="0"
                data-allowtransparency
                allow="encrypted-media"
                // style={{ border: 0, overflow: 'hidden', width: '100%', height: '300px' }}
                data-src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fodetoenjoy%2F&amp;tabs=messages&amp;width=280&amp;height=300&amp;small_header=true&amp;adapt_container_width=true&amp;hide_cover=true&amp;show_facepile=true&amp;appId=2241648436114870"
            ></iframe>
            {children}
        </div>
    );
};

export default Sidebar;
