import { h } from 'preact';
import Helmet from 'preact-helmet';
import Router from 'preact-router';

import './main.scss';

import HomePage from './pages/Home';
import VideoListPage from './pages/VideoList';
import VideoDetailsPage from './pages/VideoDetails';
import UploadPage from './pages/Upload';
import LegalNotesPage from './pages/LegalNotes';
import UploadDetailsPage from './pages/UploadDetails';

import SiteHeader from './components/SiteHeader/SiteHeader';
// import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import SiteFooter from './components/SiteFooter/SiteFooter';

export default ({ url }) => {
    return (
        <div>
            <Helmet
                htmlAttributes={{ lang: 'en' }}
                title="Page title"
                meta={[
                    { 'name': 'description', 'content': 'Description', 'og:description': 'ogdesc' }
                ]}
            />

            <SiteHeader/>

            {/*<Breadcrumbs links={[{ text: 'Home', href: '/', title: 'Home' }, { text: 'List', href: '/', title: 'List' }]}/>*/}

            <Router url={url}>
                <HomePage path="/" />
                <VideoListPage path="/videos" />
                <VideoDetailsPage path="/videos/:slug" />
                <UploadPage path="/upload" />
                <UploadDetailsPage path="/upload/:url" />
                <LegalNotesPage path="/legal" />
            </Router>

            <SiteFooter/>
        </div>
    );
};
