import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';

import Page from '../../components/layouts/Page';
import SEO from '../../components/atoms/Seo';

import Hero from '../../pageComponents/home/Hero';
import Features from '../../pageComponents/home/Features';

import { ImageLoadedContext } from '../../contexts/ImageLoadedContext';
import { AppReadyContext } from '../../contexts/AppReadyContext';

type AppStatus = 'start' | 'ready';

interface Props {
  data: {
    allFile: {
      nodes: FileSystemNode[];
    };
  };
}

const FADE_DURATION = 0.3;

export default function Home({ data }: Props) {
  const [appStatus, setAppStatus] = useState('start' as AppStatus);

  const appLoading = appStatus === 'start';
  const appReady = appStatus === 'ready';

  const loadedImgDictionary = useRef({});

  const imageLoaded = (name: string) => {
    loadedImgDictionary.current = {
      ...loadedImgDictionary.current,
      [name]: true,
    };

    const loadedImgs = Object.keys(loadedImgDictionary.current);
    const imgsToBeLoaded = data.allFile.nodes;

    console.log('-------------------');
    console.log('Image loaded ' + name);
    console.log(loadedImgDictionary);
    console.log(loadedImgs.length);
    console.log(imgsToBeLoaded.length);

    if (loadedImgs.length >= imgsToBeLoaded.length && appLoading) {
      setInterval(() => {
        setAppStatus('ready');
      }, FADE_DURATION * 1000);
    }
  };

  return (
    <AppReadyContext.Provider value={appReady}>
      <ImageLoadedContext.Provider value={imageLoaded}>
        <Page>
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
