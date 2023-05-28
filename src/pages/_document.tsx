import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="content-language" content="ja" />
        <meta name="theme-color" content="#00488e" />
        <meta name="application-name" content="gourmet-search" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          href="android-chrome-192x192.png"
          sizes="192x192"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
