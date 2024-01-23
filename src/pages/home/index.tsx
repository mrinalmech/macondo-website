import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';

import Page from '../../components/layouts/Page';
import SEO from '../../components/atoms/Seo';
import Loader, { LOADING_SCREEN_DURATION } from '../../components/fragments/Loader';

import Hero from '../../pageComponents/home/Hero';
import Features from '../../pageComponents/home/Features';

import { ImageLoadedContext } from '../../contexts/ImageLoadedContext';
import { AppReadyContext } from '../../contexts/AppReadyContext';

type AppStatus = 'loadingStart' | 'loadingFinish' | 'ready';

interface Props {
  data: {
    allFile: {
      nodes: FileSystemNode[];
    };
  };
}

export default function Home({ data }: Props) {
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
        <Page fixedHeader>
          {!appReady && <Loader appLoaded={appLoaded} />}
          <Hero />
          <Features />
        </Page>
      </ImageLoadedContext.Provider>
    </AppReadyContext.Provider>
  );
}

export const Head = () => <SEO />;

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "loadingHeroImages" } }) {
      nodes {
        name
      }
    }
  }
`;
