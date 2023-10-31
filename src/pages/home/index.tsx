import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';

import Page from '../../components/layouts/Page';
import Loader from '../../components/fragments/Loader';

import { ImageLoadedContext } from '../../contexts/ImageLoadedContext';
import { LoadingContext } from '../../contexts/LoadingContext';

import Hero from '../../pageComponents/home/Hero';
import Features from '../../pageComponents/home/Features';

export default function Home({ data }) {
  const [loading, setLoading] = useState(true);
  const loadingDictionary = useRef({});

  const imageLoaded = (name: string) => {
    console.log('Img loaded ' + name);
    loadingDictionary.current = {
      ...loadingDictionary.current,
      [name]: true,
    };

    const loadedImgs = Object.keys(loadingDictionary.current);
    const imgsToBeLoaded = data.allFile.nodes;

    if (loadedImgs.length >= imgsToBeLoaded.length && loading) {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <LoadingContext.Provider value={loading}>
      <ImageLoadedContext.Provider value={imageLoaded}>
        {loading && <Loader />}
        <Page fixedHeader>
          <Hero />
          <Features />
        </Page>
      </ImageLoadedContext.Provider>
    </LoadingContext.Provider>
  );
}

export const Head = ({ data }) => {
  const { title, description, author } = data.site.siteMetadata;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "loadingHeroImages" } }) {
      nodes {
        name
      }
    }
  }
`;
