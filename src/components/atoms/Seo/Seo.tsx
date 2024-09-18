import React from 'react';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { JsonLD, type JsonLDData } from 'react-safe-json-ld';

import { useSiteMetadata } from '../../../hooks/useSiteMetadata';

interface Props {
  title?: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
  lang?: string;
  ogImg?: IGatsbyImageData;
  ogImgAlt?: string;
  schema?: JsonLDData;
  isTest?: boolean;
}

export default function SEO({
  title,
  description,
  pathname,
  children,
  lang = 'en',
  ogImgAlt,
  ogImg,
  schema,
  isTest,
}: Props) {
  const ogImgUrl = ogImg?.images?.fallback?.src;

  const {
    title: defaultTitle,
    description: defaultDescription,
    googleSiteVerification,
    siteUrl,
    author,
  } = useSiteMetadata();

  const seo = {
    title: title ? `${defaultTitle} | ${title}` : defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ''}`,
    author,
    googleSiteVerification,
  };

  return (
    <>
      {!isTest ? <html lang={lang} /> : <meta name="lang" content={lang} />}
      <title>{seo.title}</title>
      {schema && <JsonLD data={schema} />}
      <meta name="description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={seo.title} />
      {ogImg && (
        <>
          <meta property="og:image" content={`${siteUrl}${ogImgUrl}`} />
          <meta property="og:image:width" content={`${ogImg.width}`} />
          <meta property="og:image:height" content={`${ogImg.height}`} />
          {ogImgAlt && <meta property="og:image:alt" content={ogImgAlt} />}
        </>
      )}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:creator" content={seo.author} />
      {ogImg && (
        <>
          <meta name="twitter:image" content={`${siteUrl}${ogImgUrl}`} />
          {ogImgAlt && <meta name="twitter:image:alt" content={ogImgAlt} />}
        </>
      )}
      <meta name="google-site-verification" content={googleSiteVerification} />
      {children}
    </>
  );
}
