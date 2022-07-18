// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/primary-regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
        </Head>
<<<<<<< HEAD
        <body>
=======
        <body className="h-screen overflow-y-hidden">
>>>>>>> 322f8513885d291e1d0a6c90cc35ab4265884d84
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
