import React, { useState, useEffect, useRef } from "react"
import { useTimeout } from 'react-use-timeout';

import Layout from "../../components/Layout"
import Head from "../../components/Head"
import Loader from "../../components/Loader"

import Hero from "../../pageComponents/home/Hero"
import Features from "../../pageComponents/home/Features"
import Footer from "../../pageComponents/home/Footer"

const urls = [
  "monitor",
  "wallShade",
  "websiteBaseL1Left",
  "websiteBaseL2Left",
  "websiteBaseL1Right",
  "websiteBaseL2Right",
  "logo",
  "repeat",
  "players",
  "enemies",
  "upgrades",
  "ss1",
  "ss2",
  "ss3",
  "ss4"
]

export default function Home() {

  const [loading, setLoading] = useState(true);
  const counter = useRef(0);

  const imageLoaded = () => {
    counter.current += 1;
    console.log(counter.current)
    if (counter.current >= urls.length) {
      setLoading(false);
    }
  }

  const timeout = useTimeout(() => setLoading(false), 2000);

  useEffect(() => {
    //timeout.start();
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <Layout>
        <Head title="Macondo Games" />
        <Hero imageLoaded={imageLoaded} loading={loading}/>
        <Features imageLoaded={imageLoaded}/>
        <Footer />
      </Layout>
    </>
  )
}
