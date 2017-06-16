import { h } from 'preact';

import './VideoPlayer.scss';

export default ({ url }) => <div class="video-player"><iframe src={url}></iframe></div>;
