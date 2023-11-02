import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';

import Page from '../../components/layouts/Page';
import Loader, { LOADING_SCREEN_DURATION } from '../../components/fragments/Loader';

import { ImageLoadedContext } from '../../contexts/ImageLoadedContext';
import { AppReadyContext } from '../../contexts/AppReadyContext';

import Hero from '../../pageComponents/home/Hero';
import Features from '../../pageComponents/home/Features';

type AppStatus = 'loadingStart' | 'loadingFinish' | 'ready';

export default function Home({ data }) {
  const [appStatus, setAppStatus] = useState('loadingStart' as AppStatus);

  const appLoading = appStatus === 'loadingStart';
  const appLoaded = appStatus != 'loadingStart';
  const appReady = appStatus === 'ready';

  const loadedImgDictionary = useRef({});

  const imageLoaded = (name: string) => {
    loadedImgDictionary.current = {
      ...loadedImgDictionary.current,
      [name]: true,
    };

    const loadedImgs = Object.keys(loadedImgDictionary.current);
    const imgsToBeLoaded = data.allFile.nodes;

    if (loadedImgs.length >= imgsToBeLoaded.length && appLoading) {
      setAppStatus('loadingFinish');

      setInterval(() => {
        setAppStatus('ready');
        document.body.style.overflow = 'auto';
      }, LOADING_SCREEN_DURATION * 1000);
    }
  };

  return (
    <AppReadyContext.Provider value={appReady}>
      <ImageLoadedContext.Provider value={imageLoaded}>
        {!appReady && <Loader appLoaded={appLoaded} />}
        <Page fixedHeader>
          <Hero />
          <Features />
        </Page>
      </ImageLoadedContext.Provider>
    </AppReadyContext.Provider>
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
