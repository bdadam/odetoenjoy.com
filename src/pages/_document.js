import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <iframe
                        hidden
                        id="player"
                        type="text/html"
                        width="640"
                        height="390"
                        src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://localhost:3000"
                        frameBorder="0"
                    ></iframe>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
