import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { useSiteMetadata } from '../../../hooks/useSiteMetadata';

interface Props {
  title?: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
}

export default function SEO({ title, description, pathname, children }: Props) {
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
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="og:type" content="website" />
      <meta name="og:title" content={seo.title} />
      <meta name="og:description" content={seo.description} />
      <meta name="og:url" content={seo.url} />
      <meta name="og:site_name" content={seo.title} />
      <meta name="og:image" content={ogImgUrl} />
      <meta name="og:image:width" content={`${ogImg.width}`} />
      <meta name="og:image:height" content={`${ogImg.height}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:creator" content={seo.author} />
      <meta name="twitter:image" content={ogImgUrl} />

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
