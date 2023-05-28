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
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:site_name" content={metaTitle} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/ogp_large.png`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL} />
    </Head>
  );
};
