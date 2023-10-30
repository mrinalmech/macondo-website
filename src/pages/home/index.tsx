import React, { useState, useEffect, useRef } from 'react';

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
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= urls.length && loading) {
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

export const Head = () => <title>Macondo Games</title>;
