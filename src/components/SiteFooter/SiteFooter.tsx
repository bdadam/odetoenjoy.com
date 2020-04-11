import './SiteFooter.less';
import Link from 'next/link';

export default () => {
    return (
        <footer className="site-footer">
            odetoenjoy.com &copy; {new Date().getFullYear()}
            <br />
            <Link href="/about" as="/about">
                <a>About us</a>
            </Link>
            <p>It is important to enjoy life.</p>
        </footer>
    );
};
