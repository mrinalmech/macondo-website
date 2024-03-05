import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { graphql } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';

import Page from '../../components/layouts/Page';
import SEO from '../../components/atoms/Seo';

import Hero from '../../pageComponents/home/Hero';
import Features from '../../pageComponents/home/Features';

import { ImageLoadedContext } from '../../contexts/ImageLoadedContext';
import { selectAppLoaded, setAppLoaded } from '../../store/appSlice';
import { RootDispatch } from '../../store/createStore';

interface Props {
  data: {
    allFile: {
      nodes: FileSystemNode[];
    };
  };
}

export default function Home({ data }: Props) {
  const dispatch = useDispatch<RootDispatch>();
  const appLoaded = useSelector(selectAppLoaded);

  const loadedImgDictionary = useRef({});

  const imageLoaded = (name: string) => {
    loadedImgDictionary.current = {
      ...loadedImgDictionary.current,
      [name]: true,
    };

    const loadedImgs = Object.keys(loadedImgDictionary.current);
    const imgsToBeLoaded = data.allFile.nodes;

    if (loadedImgs.length >= imgsToBeLoaded.length && appLoaded === false) {
      dispatch(setAppLoaded(true));
    }
  };

  return (
    <ImageLoadedContext.Provider value={imageLoaded}>
      <Page>
        <Hero />
        <Features />
      </Page>
    </ImageLoadedContext.Provider>
  );
}

export const Head = () => <SEO />;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: {
        ns: { in: ["home-hero", "home-features", "header", "footer"] }
        language: { eq: $language }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "loadingHeroImages" } }) {
      nodes {
        name
      }
    }
  }
`;
