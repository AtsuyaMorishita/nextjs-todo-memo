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
      <meta property="og:title" content={metaTitle} />
      <meta property="description" content={metaDesc} />
      <meta property="og:description" content={metaDesc} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/ogp_large.png`}
      />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
