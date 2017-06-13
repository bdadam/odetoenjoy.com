import { h } from 'preact';
import Helmet from 'preact-helmet';

import './main.scss';

import SiteHeader from './components/SiteHeader/SiteHeader';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

export default ({x}) => {
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

            <Breadcrumbs links={[{ text: 'Home', href: '/', title: 'Home' }, { text: 'List', href: '/', title: 'List' }]}/>


            <main role="main">
                App
                <br/>
                {x}
            </main>
        </div>
    );
};