import React, { useState, useContext, useRef } from 'react';

import Layout from '../../components/Layout';
import Head from '../../components/Head';
import Loader from '../../components/Loader';

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

document.body.style.overflow = 'hidden';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= urls.length && loading) {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <LoadingContext.Provider value={loading}>
      {loading && <Loader />}
      <Layout fixedHeader>
        <Head title="Macondo Games" />
        <Hero imageLoaded={imageLoaded} loading={loading} />
        <Features imageLoaded={imageLoaded} />
      </Layout>
    </LoadingContext.Provider>
  );
}
