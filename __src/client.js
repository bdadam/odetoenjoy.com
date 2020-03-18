import 'unfetch/polyfill';
import Promiz from 'promiz';
window.Promise = window.Promise || Promiz;

import { h, render } from 'preact';

import Application from './Application';

const appContainer = document.createElement('div');
const serverRenderedAppContainer = document.querySelector('#app');
serverRenderedAppContainer.parentNode.insertBefore(appContainer, serverRenderedAppContainer);

render(<Application x="client" />, appContainer, serverRenderedAppContainer);

if (process.env.NODE_ENV === 'development') {
    require('preact/devtools');
}
