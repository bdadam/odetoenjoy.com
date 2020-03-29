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
                    {/* <iframe
                        hidden
                        id="youtube-player-iframe"
                        frameBorder="0"
                        // style={{ position: 'absolute' }}
                        referrerPolicy="no-referrer"
                        allowFullScreen
                        // sandbox="allow-orientation-lock allow-pointer-lock allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-presentation"
                    ></iframe> */}
                    <Main />
                    <NextScript />
                    {/* TODO: finish sandbox */}
                </body>
            </Html>
        );
    }
}

export default MyDocument;
