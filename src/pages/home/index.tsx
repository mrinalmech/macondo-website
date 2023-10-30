import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';

import Page from '../../components/layouts/Page';
import Loader from '../../components/fragments/Loader';

import { ImageLoadedContext } from '../../contexts/ImageLoadedContext';
import { LoadingContext } from '../../contexts/LoadingContext';

import Hero from '../../pageComponents/home/Hero';
import Features from '../../pageComponents/home/Features';

const urls = [
  'monitor',
  'wallShade',
  'websiteBaseL1Left',
  'websiteBaseL2Left',
  'websiteBaseL1Right',
  'websiteBaseL2Right',
  'logo',
  'repeat',
  'players',
  'enemies',
  'upgrades',
  'ss0',
  'ss1',
  'ss2',
  'ss3',
  'ss4',
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const counter = useRef(0);

  /*useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);*/

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= urls.length && loading) {
      //setLoading(false);
      //document.body.style.overflow = 'auto';
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
}
`;
