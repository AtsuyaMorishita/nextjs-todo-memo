import Head from "next/head";

type MetaType = {
  title?: string;
  description?: string;
};

export const Meta = ({ title, description }: MetaType) => {
  const metaTitle = title ? `${title} | TODO MEMO` : "TODO MEMO";

  const metaDesc = description
    ? description
    : "TODOとメモを兼ね備えたアプリです。";

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
      <meta property="og:site_name" content={metaTitle} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/ogp_large.png`}
      />
      <meta name="twitter:card" content="summary_large_image" />

      <meta httpEquiv="content-language" content="ja" />
      <meta name="theme-color" content="#00488e" />
      <meta name="application-name" content={metaTitle} />
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
  );
};
