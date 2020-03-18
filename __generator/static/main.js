import 'ce-v0';

// import('ce-v0').then(x => {

// });

import './main.scss';
// console.log('MAIN');

document.registerElement('video-player', {
    prototype: Object.create(HTMLElement.prototype, {
        // createdCallback: {value: function() {
        //     console.log('custom element ready/upgraded');
        //     // better than V1 constructor() {}
        //     // because the element here will always
        //     // be already upgraded
        // }},
        attachedCallback: {
            value: function() {
                const embedUrl = this.getAttribute('embed-url');

                const iframe = document.createElement('iframe');
                iframe.src = embedUrl;
                iframe.sandbox = 'allow-scripts allow-same-origin allow-presentation';
                iframe.allowFullscreen = true;
                // iframe.style.visibility = 'hidden';

                this.appendChild(iframe);

                iframe.onload = () => {
                    console.log('VISIBLE');
                    iframe.style.visibility = 'visible';
                };

                // this.innerHTML = `<iframe class="video-container" src="${embedUrl}" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen referrerpolicy="no-referrer"></iframe>`;

                // this.addEventListener('click', () => {
                //     this.innerHTML = `<iframe class="video-container" src="${embedUrl}?autoplay=true" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen referrerpolicy="no-referrer"></iframe>`;
                // });
                // console.log('custom element connected');
                // same as connectedCallback
            },
        },
        // detachedCallback: {value: function() {
        //     console.log('custom element disconnected');
        //     // same as disconnectedCallback
        // }},
        // attributeChangedCallback: {value: function(
        //     name, oldValue, newValue
        // ) {
        //     console.log('*any* attribute change');
        //     // different from V1 in two ways:
        //     //  * it does not trigger twice with same attribute value
        //     //  * it triggers for any attribute change, no need
        //     //    to define static get observedAttributes() {[...]}
        // }}
    }),
});
