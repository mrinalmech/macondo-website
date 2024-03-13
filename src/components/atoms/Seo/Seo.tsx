import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { useSiteMetadata } from '../../../hooks/useSiteMetadata';

interface Props {
  title?: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
  lang?: string;
  ogImgAlt?: string;
  isTest?: boolean;
}

export default function SEO({
  title,
  description,
  pathname,
  children,
  lang = 'en',
  ogImgAlt = 'Side profile of three figures. Game logo on the left side of the image.',
  isTest,
}: Props) {
  const { allFile } = useStaticQuery(query);

  const ogImg = allFile.nodes[0].childImageSharp.gatsbyImageData;
  const ogImgUrl = ogImg.images.fallback.src;

  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    author,
  } = useSiteMetadata();

  const seo = {
    title: title ? `${defaultTitle} | ${title}` : defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    author,
  };

  return (
    <>
      {!isTest ? <html lang={lang} /> : <meta name="lang" content={lang} />}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={seo.title} />
      <meta property="og:image" content={`${seo.url}${ogImgUrl}`} />
      <meta property="og:image:width" content={`${ogImg.width}`} />
      <meta property="og:image:height" content={`${ogImg.height}`} />
      <meta property="og:image:alt" content={ogImgAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:creator" content={seo.author} />
      <meta name="twitter:image" content={`${seo.url}${ogImgUrl}`} />
      <meta name="twitter:image:alt" content={ogImgAlt} />
      {children}
    </>
  );
}

const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "ogImages" }, name: { eq: "og" } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(placeholder: NONE, layout: FIXED, width: 1200)
        }
      }
    }
  }
`;
