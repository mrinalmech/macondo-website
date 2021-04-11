import React, { useState, useEffect, useRef } from "react"
import { useTimeout } from 'react-use-timeout';
import clsx from "clsx";

import Layout from "../../components/Layout"
import Head from "../../components/Head"
import Loader from "../../components/Loader"

import Hero from "../../pageComponents/home/Hero"
import Features from "../../pageComponents/home/Features"
import Footer from "../../pageComponents/home/Footer"

import Monitor1x from "../../pageComponents/home/Hero/images/monitor@1x.png"
import WallShade1x from "../../pageComponents/home/Hero/images/wallShade@1x.png"
import WebsiteBaseL1_1x from "../../pageComponents/images/websiteBaseL1@1x.png"
import WebsiteBaseL2_1x from "../../pageComponents/images/websiteBaseL2@1x.png"
import Logo1x from "../../pageComponents/home/Hero/images/logo@1x.png"
import Repeat1x from "../../pageComponents/home/Hero/images/repeat@1x.png"

import {
  bgImg
} from "./Home.module.scss"

const urls = [
  Monitor1x,
  WallShade1x,
  WebsiteBaseL1_1x,
  WebsiteBaseL2_1x,
  Logo1x,
  Repeat1x
  /*  ScreenshotOne,
    ScreenshotTwo,
    ScreenshotThree,
    ScreenshotFour*/
]

export default function Home() {

  const [loading, setLoading] = useState(true);
  const counter = useRef(0);

  const imageLoaded = () => {
    counter.current += 1;
    //Extra two cause the pillars at the back are repeated
    if (counter.current >= urls.length + 2) {
      setLoading(false);
    }
  }

  const [bgImageLoading, setBgImageLoading] = useState(true)
  const bgImageLoaded = () => {
    setBgImageLoading(false)
    imageLoaded()
  }

  const timeout = useTimeout(() => setLoading(false), 3000);

  useEffect(() => {
    timeout.start();
  }, []);

  return (
    <>
      {
        bgImageLoading && <img
          src={Repeat1x}
          className={clsx("position-absolute", bgImg)}
          onLoad={bgImageLoaded}
        />
      }
      <Loader loading={loading} />
      <Layout>
        <Head title="Macondo Games" />
        <Hero imageLoaded={imageLoaded}/>
        <Features />
        <Footer />
      </Layout>
    </>
  )
}
