import { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

import './ShareButtons.less';

type Props = {
    title: string;
    url: string;
};

const ShareButtons: React.FC<Props> = ({ title, url }) => {
    const [state, setState] = useState({ native: false, visible: false });

    const [modalVisible, toggleModal] = useState(false);

    useEffect(() => {
        // @ts-ignore
        console.log(navigator.share);

        // @ts-ignore
        setState({ visible: true, native: !!navigator.share });
    }, []);

    if (!state.visible) {
        return null;
    }

    return (
        <>
            <div>
                <button className="share-button--native" onClick={() => toggleModal(!modalVisible)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path d="M27 22a4.985 4.985 0 00-3.594 1.526L9.937 16.792a5.035 5.035 0 000-1.582l13.469-6.734a5 5 0 10-1.343-2.683L8.594 12.527A5 5 0 105 21.001a4.985 4.985 0 003.594-1.526l13.469 6.734A5 5 0 1027 22z"></path>
                    </svg>
                    <span className="network-name">Share</span>
                </button>
                {modalVisible && (
                    <div className="share-buttons">
                        <h4>Social</h4>
                        <a
                            href={`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                            rel="external"
                            target="_blank"
                            className="share-button--fb"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path d="M29 0H3C1.35 0 0 1.35 0 3v26c0 1.65 1.35 3 3 3h13V18h-4v-4h4v-2c0-3.306 2.694-6 6-6h4v4h-4c-1.1 0-2 .9-2 2v2h6l-1 4h-5v14h9c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3z"></path>
                            </svg>
                            <span className="network-name">Facebook</span>
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} ${url}`)}`}
                            rel="external"
                            target="_blank"
                            className="share-button--tw"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path d="M32 7.075a12.941 12.941 0 01-3.769 1.031 6.601 6.601 0 002.887-3.631 13.21 13.21 0 01-4.169 1.594A6.565 6.565 0 0022.155 4a6.563 6.563 0 00-6.563 6.563c0 .512.056 1.012.169 1.494A18.635 18.635 0 012.23 5.195a6.56 6.56 0 00-.887 3.3 6.557 6.557 0 002.919 5.463 6.565 6.565 0 01-2.975-.819v.081a6.565 6.565 0 005.269 6.437 6.574 6.574 0 01-2.968.112 6.588 6.588 0 006.131 4.563 13.17 13.17 0 01-9.725 2.719 18.568 18.568 0 0010.069 2.95c12.075 0 18.681-10.006 18.681-18.681 0-.287-.006-.569-.019-.85A13.216 13.216 0 0032 7.076z"></path>
                            </svg>
                            <span className="network-name">Twitter</span>
                        </a>
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
                            rel="external"
                            target="_blank"
                            className="share-button--wa"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path d="M27.281 4.65C24.287 1.65 20.306 0 16.062 0 7.324 0 .212 7.112.212 15.856c0 2.794.731 5.525 2.119 7.925L.081 32l8.406-2.206a15.858 15.858 0 007.575 1.931h.006c8.738 0 15.856-7.113 15.856-15.856 0-4.238-1.65-8.219-4.644-11.219zm-11.212 24.4a13.17 13.17 0 01-6.713-1.837l-.481-.288-4.987 1.306 1.331-4.863-.313-.5a13.086 13.086 0 01-2.019-7.012c0-7.269 5.912-13.181 13.188-13.181 3.519 0 6.831 1.375 9.319 3.862a13.108 13.108 0 013.856 9.325c-.006 7.275-5.919 13.188-13.181 13.188zm7.225-9.875c-.394-.2-2.344-1.156-2.706-1.288s-.625-.2-.894.2c-.262.394-1.025 1.288-1.256 1.556-.231.262-.462.3-.856.1s-1.675-.619-3.188-1.969c-1.175-1.05-1.975-2.35-2.206-2.744s-.025-.613.175-.806c.181-.175.394-.463.594-.694s.262-.394.394-.662c.131-.262.069-.494-.031-.694s-.894-2.15-1.219-2.944c-.319-.775-.65-.669-.894-.681-.231-.012-.494-.012-.756-.012s-.694.1-1.056.494c-.363.394-1.387 1.356-1.387 3.306s1.419 3.831 1.619 4.1c.2.262 2.794 4.269 6.769 5.981.944.406 1.681.65 2.256.837.95.3 1.813.256 2.494.156.762-.113 2.344-.956 2.675-1.881s.331-1.719.231-1.881c-.094-.175-.356-.275-.756-.475z"></path>
                            </svg>
                            <span className="network-name">WhatsApp</span>
                        </a>

                        <a
                            href={`mailto:?body=${encodeURIComponent(`${title}\n${url}`)}`}
                            target="_blank"
                            className="share-button--email"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path d="M29 4H3C1.35 4 0 5.35 0 7v20c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3V7c0-1.65-1.35-3-3-3zM12.461 17.199L4 23.789V8.113l8.461 9.086zM5.512 8h20.976L16 15.875 5.512 8zm7.278 9.553L16 21l3.21-3.447L25.79 26H6.211l6.58-8.447zm6.749-.354L28 8.113v15.676l-8.461-6.59z"></path>
                            </svg>
                            <span className="network-name">E-mail</span>
                        </a>

                        <h4>Link</h4>
                        <input
                            type="text"
                            readOnly={true}
                            value={url}
                            className="video-link"
                            onClick={e => (e.target as HTMLInputElement).select()}
                        />
                        <button className="share-button--copy" onClick={() => navigator.clipboard.writeText(`${url}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path d="M13.757 19.868a1.62 1.62 0 01-1.149-.476c-2.973-2.973-2.973-7.81 0-10.783l6-6C20.048 1.169 21.963.376 24 .376s3.951.793 5.392 2.233c2.973 2.973 2.973 7.81 0 10.783l-2.743 2.743a1.624 1.624 0 11-2.298-2.298l2.743-2.743a4.38 4.38 0 000-6.187c-.826-.826-1.925-1.281-3.094-1.281s-2.267.455-3.094 1.281l-6 6a4.38 4.38 0 000 6.187 1.624 1.624 0 01-1.149 2.774z"></path>
                                <path d="M8 31.625a7.575 7.575 0 01-5.392-2.233c-2.973-2.973-2.973-7.81 0-10.783l2.743-2.743a1.624 1.624 0 112.298 2.298l-2.743 2.743a4.38 4.38 0 000 6.187c.826.826 1.925 1.281 3.094 1.281s2.267-.455 3.094-1.281l6-6a4.38 4.38 0 000-6.187 1.624 1.624 0 112.298-2.298c2.973 2.973 2.973 7.81 0 10.783l-6 6A7.575 7.575 0 018 31.625z"></path>
                            </svg>
                            <span className="network-name">Copy link</span>
                        </button>
                        <h4>Choose app</h4>
                        <button className="share-button--native">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path d="M27 22a4.985 4.985 0 00-3.594 1.526L9.937 16.792a5.035 5.035 0 000-1.582l13.469-6.734a5 5 0 10-1.343-2.683L8.594 12.527A5 5 0 105 21.001a4.985 4.985 0 003.594-1.526l13.469 6.734A5 5 0 1027 22z"></path>
                            </svg>
                            <span className="network-name">Share this video</span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );

    // return (
    //     <div className="share-buttons">
    //         <a
    //             href={`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
    //             rel="external"
    //             target="_blank"
    //             className="share-button--fb"
    //         >
    //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    //                 <path d="M29 0H3C1.35 0 0 1.35 0 3v26c0 1.65 1.35 3 3 3h13V18h-4v-4h4v-2c0-3.306 2.694-6 6-6h4v4h-4c-1.1 0-2 .9-2 2v2h6l-1 4h-5v14h9c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3z"></path>
    //             </svg>
    //             <span className="network-name">Facebook</span>
    //         </a>
    //         <a href={``} rel="external" target="_blank" className="share-button--tw">
    //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    //                 <path d="M32 7.075a12.941 12.941 0 01-3.769 1.031 6.601 6.601 0 002.887-3.631 13.21 13.21 0 01-4.169 1.594A6.565 6.565 0 0022.155 4a6.563 6.563 0 00-6.563 6.563c0 .512.056 1.012.169 1.494A18.635 18.635 0 012.23 5.195a6.56 6.56 0 00-.887 3.3 6.557 6.557 0 002.919 5.463 6.565 6.565 0 01-2.975-.819v.081a6.565 6.565 0 005.269 6.437 6.574 6.574 0 01-2.968.112 6.588 6.588 0 006.131 4.563 13.17 13.17 0 01-9.725 2.719 18.568 18.568 0 0010.069 2.95c12.075 0 18.681-10.006 18.681-18.681 0-.287-.006-.569-.019-.85A13.216 13.216 0 0032 7.076z"></path>
    //             </svg>
    //             <span className="network-name">Twitter</span>
    //         </a>
    //         <a href={``} rel="external" target="_blank" className="share-button--wa">
    //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    //                 <path d="M27.281 4.65C24.287 1.65 20.306 0 16.062 0 7.324 0 .212 7.112.212 15.856c0 2.794.731 5.525 2.119 7.925L.081 32l8.406-2.206a15.858 15.858 0 007.575 1.931h.006c8.738 0 15.856-7.113 15.856-15.856 0-4.238-1.65-8.219-4.644-11.219zm-11.212 24.4a13.17 13.17 0 01-6.713-1.837l-.481-.288-4.987 1.306 1.331-4.863-.313-.5a13.086 13.086 0 01-2.019-7.012c0-7.269 5.912-13.181 13.188-13.181 3.519 0 6.831 1.375 9.319 3.862a13.108 13.108 0 013.856 9.325c-.006 7.275-5.919 13.188-13.181 13.188zm7.225-9.875c-.394-.2-2.344-1.156-2.706-1.288s-.625-.2-.894.2c-.262.394-1.025 1.288-1.256 1.556-.231.262-.462.3-.856.1s-1.675-.619-3.188-1.969c-1.175-1.05-1.975-2.35-2.206-2.744s-.025-.613.175-.806c.181-.175.394-.463.594-.694s.262-.394.394-.662c.131-.262.069-.494-.031-.694s-.894-2.15-1.219-2.944c-.319-.775-.65-.669-.894-.681-.231-.012-.494-.012-.756-.012s-.694.1-1.056.494c-.363.394-1.387 1.356-1.387 3.306s1.419 3.831 1.619 4.1c.2.262 2.794 4.269 6.769 5.981.944.406 1.681.65 2.256.837.95.3 1.813.256 2.494.156.762-.113 2.344-.956 2.675-1.881s.331-1.719.231-1.881c-.094-.175-.356-.275-.756-.475z"></path>
    //             </svg>
    //             <span className="network-name">WhatsApp</span>
    //         </a>
    //         <a href={`mailto:`} className="share-button--email">
    //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    //                 <path d="M29 4H3C1.35 4 0 5.35 0 7v20c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3V7c0-1.65-1.35-3-3-3zM12.461 17.199L4 23.789V8.113l8.461 9.086zM5.512 8h20.976L16 15.875 5.512 8zm7.278 9.553L16 21l3.21-3.447L25.79 26H6.211l6.58-8.447zm6.749-.354L28 8.113v15.676l-8.461-6.59z"></path>
    //             </svg>
    //             <span className="network-name">E-mail</span>
    //         </a>
    //         <button className="share-button--copy">
    //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    //                 <path d="M13.757 19.868a1.62 1.62 0 01-1.149-.476c-2.973-2.973-2.973-7.81 0-10.783l6-6C20.048 1.169 21.963.376 24 .376s3.951.793 5.392 2.233c2.973 2.973 2.973 7.81 0 10.783l-2.743 2.743a1.624 1.624 0 11-2.298-2.298l2.743-2.743a4.38 4.38 0 000-6.187c-.826-.826-1.925-1.281-3.094-1.281s-2.267.455-3.094 1.281l-6 6a4.38 4.38 0 000 6.187 1.624 1.624 0 01-1.149 2.774z"></path>
    //                 <path d="M8 31.625a7.575 7.575 0 01-5.392-2.233c-2.973-2.973-2.973-7.81 0-10.783l2.743-2.743a1.624 1.624 0 112.298 2.298l-2.743 2.743a4.38 4.38 0 000 6.187c.826.826 1.925 1.281 3.094 1.281s2.267-.455 3.094-1.281l6-6a4.38 4.38 0 000-6.187 1.624 1.624 0 112.298-2.298c2.973 2.973 2.973 7.81 0 10.783l-6 6A7.575 7.575 0 018 31.625z"></path>
    //             </svg>
    //             <span className="network-name">Copy link</span>
    //         </button>
    //         <button className="share-button--native">
    //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    //                 <path d="M27 22a4.985 4.985 0 00-3.594 1.526L9.937 16.792a5.035 5.035 0 000-1.582l13.469-6.734a5 5 0 10-1.343-2.683L8.594 12.527A5 5 0 105 21.001a4.985 4.985 0 003.594-1.526l13.469 6.734A5 5 0 1027 22z"></path>
    //             </svg>
    //             <span className="network-name">Share this video</span>
    //         </button>
    //     </div>
    // );
};

export default ShareButtons;
