import { h } from 'preact';

import Hero from '../components/Hero/Hero';

const Video = ({ title }) => {
    return (
        <div class="video-item">
            <div class="video-item__image"></div>
            
        </div>
    );   
};

export default () => {
    const videos = [
        { title: 'Test title' }
    ];


    return (
        <div>
            <Hero />
            <div class="container">
                <div class="row">
                    { videos.map(v => <Video title={v.title} />) }
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col" style="background-color: #aaa; height: 48px;"></div>
                    <div class="col" style="background-color: #aaa; height: 48px;"></div>
                    <div class="col" style="background-color: #aaa; height: 48px;"></div>
                    <div class="col" style="background-color: #aaa; height: 48px;"></div>
                </div>
                <br/>
                <div class="row">
                    <div class="col" style="background-color: #aaa; height: 48px;"></div>
                    <div class="col" style="background-color: #aaa; height: 48px;"></div>
                    <div class="col" style="background-color: #aaa; height: 48px;"></div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-sm-2" style="background-color: #aaa; height: 48px;"></div>
                    <div class="col-sm-3" style="background-color: #aaa; height: 48px;"></div>
                    <div class="col-sm-4" style="background-color: #aaa; height: 48px;"></div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-lg-2" style="background-color: #aaa; height: 48px;"></div>
                    <div class="col-lg-3" style="background-color: #aaa; height: 48px;"></div>
                    <div class="col-lg-4" style="background-color: #aaa; height: 48px;"></div>
                </div>
            </div>
        </div>
    );
};
