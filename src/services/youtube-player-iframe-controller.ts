type Props = {
    iframe: undefined | HTMLIFrameElement;
};

/*
                iframe.contentWindow!.postMessage(JSON.stringify({ event: 'listening' }), '*');
                const command = { event: 'command', func: 'playVideo' };
                iframe.contentWindow!.postMessage(JSON.stringify(command), '*');
            };
        } else {
            const id = url.substr(-11);
            const command = { event: 'command', func: 'loadVideoById', args: [id] };
            // const command2 = { event: 'command', func: 'playVideo' };

            iframe.contentWindow!.postMessage(JSON.stringify(command), '*');

*/

type Listening = {
    event: 'listening';
};

type LoadVideoById = {
    event: 'command';
    func: 'loadVideoById';
    args: [string, number?, number?];
};

type StopVideo = {
    event: 'command';
    func: 'stopVideo';
};

type YoutubeCommand = Listening | LoadVideoById | StopVideo;

const x: Props = {
    iframe: undefined,
};

const sendCommand = (iframe: HTMLIFrameElement | undefined, cmd: YoutubeCommand) => {
    if (!iframe) {
        return;
    }

    iframe.contentWindow?.postMessage(JSON.stringify(cmd), '*');
};

export const init = (videoId: string, iframe: HTMLIFrameElement) => {
    // const iframe = document.querySelector<HTMLIFrameElement>('#youtube-player-iframe2')!;

    iframe.hidden = false;

    if (!iframe.src || iframe.dataset.ready !== '1') {
        iframe.style.opacity = '0';
        iframe.src = `https://youtube.com/embed/${videoId}?enablejsapi=1&modestbranding=1`;
        // iframe.src = `https://youtube.com/embed/${videoId}?enablejsapi=1&modestbranding=1&autoplay=1`;

        iframe.onload = () => {
            iframe.dataset.ready = '1';
            iframe.style.opacity = '1';
            window.addEventListener('message', e => {
                if (e.origin !== 'https://www.youtube.com' || e.source !== iframe.contentWindow) {
                    return;
                }

                console.log(e);
                console.log(e.source === iframe.contentWindow);
            });
            sendCommand(iframe, { event: 'listening' });
        };
    } else {
        sendCommand(iframe, { event: 'command', func: 'loadVideoById', args: [videoId] });
    }

    return {
        position: (x: number, y: number, width: number, height: number) => {
            console.log('Position', x, y, width, height);

            iframe.style.top = `${x}px`;
            iframe.style.left = `${y}px`;
            iframe.style.width = `${width}px`;
            iframe.style.height = `${height}px`;
        },
        stop: () => {
            sendCommand(iframe, { event: 'command', func: 'stopVideo' });
        },
        hide: () => {
            iframe.hidden = true;
            sendCommand(iframe, { event: 'command', func: 'stopVideo' });
        },
    };
};
