import React, { useState, useEffect, useRef } from "react"
import clsx from "clsx"
import { useTimeout } from 'react-use-timeout';
import Carousel from "react-bootstrap/Carousel"

import Loader from "../../../components/Loader"

import {
  root,
  desc,
  monitor,
  extension,
  wallShade,
  carousel,
  logo,
  baseL1,
  baseL2,
  left,
  right,
  textContent,
  bgImg
} from "./Hero.module.scss"

import Monitor1x from "./images/monitor@1x.png"
import Monitor2x from "./images/monitor@2x.png"
import Monitor3x from "./images/monitor@3x.png"
import Monitor4x from "./images/monitor@4x.png"
import WallShade1x from "./images/wallShade@1x.png"
import WallShade2x from "./images/wallShade@2x.png"
import WallShade3x from "./images/wallShade@3x.png"
import WallShade4x from "./images/wallShade@4x.png"
import WebsiteBaseL1_1x from "./images/websiteBaseL1@1x.png"
import WebsiteBaseL1_2x from "./images/websiteBaseL1@2x.png"
import WebsiteBaseL1_3x from "./images/websiteBaseL1@3x.png"
import WebsiteBaseL1_4x from "./images/websiteBaseL1@4x.png"
import WebsiteBaseL2_1x from "./images/websiteBaseL2@1x.png"
import WebsiteBaseL2_2x from "./images/websiteBaseL2@2x.png"
import WebsiteBaseL2_3x from "./images/websiteBaseL2@3x.png"
import WebsiteBaseL2_4x from "./images/websiteBaseL2@4x.png"
import Logo1x from "./images/logo@1x.png"
import Logo2x from "./images/logo@2x.png"
import Logo3x from "./images/logo@3x.png"
import Logo4x from "./images/logo@4x.png"

import Repeat1x from "./images/repeat@1x.png"

import ScreenshotOne from "./images/screenshot-1.jpg"
import ScreenshotTwo from "./images/screenshot-2.jpg"
import ScreenshotThree from "./images/screenshot-3.png"
import ScreenshotFour from "./images/screenshot-4.png"


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


export default function Hero() {

  const [loading, setLoading] = useState(true);
  const counter = useRef(0);

  const imageLoaded = (val?) => {
    counter.current += 1;
    console.log(val)
    console.log(counter.current)
    //Extra two cause the pillars at the back are repeated
    if (counter.current >= urls.length + 2) {
      //setLoading(false);
    }
  }

  const [bgImageLoading, setBgImageLoading] = useState(true)
  const bgImageLoaded = () => {
    setBgImageLoading(false)
    imageLoaded("repeat")
  }

  const timeout = useTimeout(()=>setLoading(false), 3000);

  useEffect(() => {
    //timeout.start();
  }, []);

  return <>
    <Loader loading={loading} />
    <div className={clsx(root, `d-flex
    align-items-end
    justify-content-center
    pb-4
    pb-sm-2
    pb-md-4
    position-relative
    overflow-hidden`
    )}>
      {bgImageLoading && <img src={Repeat1x} className={clsx("position-absolute", bgImg)} onLoad={bgImageLoaded} />}
      <img
        src={Logo1x}
        srcSet={
          `${Logo4x} 4x,
      ${Logo3x} 3x,
      ${Logo2x} 2x,
      ${Logo1x} 1x`
        }
        alt=""
        className={clsx("position-absolute pl-2 pr-2 pl-sm-0 pr-sm-0 ", logo)}
        onLoad={() => imageLoaded("logo")}
      />
      <img
        src={WallShade1x}
        srcSet={
          `${WallShade4x} 4x,
        ${WallShade3x} 3x,
        ${WallShade2x} 2x,
        ${WallShade1x} 1x`
        }
        alt=""
        className={clsx("position-absolute", wallShade)}
        onLoad={() => imageLoaded("wallShade")}
      />
      <img
        src={WebsiteBaseL1_1x}
        srcSet={
          `${WebsiteBaseL1_4x} 4x,
        ${WebsiteBaseL1_3x} 3x,
        ${WebsiteBaseL1_2x} 2x,
        ${WebsiteBaseL1_1x} 1x`
        }
        alt=""
        className={clsx("position-absolute", baseL1, left)}
        onLoad={() => imageLoaded("baseL1Left")}
      />
      <img
        src={WebsiteBaseL2_1x}
        srcSet={
          `${WebsiteBaseL2_4x} 4x,
        ${WebsiteBaseL2_3x} 3x,
        ${WebsiteBaseL2_2x} 2x,
        ${WebsiteBaseL2_1x} 1x`
        }
        alt=""
        className={clsx("position-absolute", baseL2, left)}
        onLoad={() => imageLoaded("baseL2Left")}
      />
      <img
        src={WebsiteBaseL1_1x}
        srcSet={
          `${WebsiteBaseL1_4x} 4x,
        ${WebsiteBaseL1_3x} 3x,
        ${WebsiteBaseL1_2x} 2x,
        ${WebsiteBaseL1_1x} 1x`
        }
        alt=""
        className={clsx("position-absolute", baseL1, right)}
        onLoad={() => imageLoaded("baseL1Right")}
      />
      <img
        src={WebsiteBaseL2_1x}
        srcSet={
          `${WebsiteBaseL2_4x} 4x,
        ${WebsiteBaseL2_3x} 3x,
        ${WebsiteBaseL2_2x} 2x,
        ${WebsiteBaseL2_1x} 1x`
        }
        alt=""
        className={clsx("position-absolute", baseL2, right)}
        onLoad={() => imageLoaded("baseL2Right")}
      />
      <img
        src={Monitor1x}
        srcSet={
          `${Monitor4x} 4x,
        ${Monitor3x} 3x,
        ${Monitor2x} 2x,
        ${Monitor1x} 1x`
        }
        alt=""
        className={clsx("position-absolute", monitor)}
        onLoad={() => imageLoaded("monitor")}
      />
      {/*<i className="position-absolute"/>*/}
      {/*<Carousel
      className={clsx(carousel, "position-absolute")}
      controls={false}
      indicators={false}
      fade
    >
      <Carousel.Item>
        <img src={ScreenshotOne} />
      </Carousel.Item>
      <Carousel.Item>
        <img src={ScreenshotTwo} />
      </Carousel.Item>
      <Carousel.Item>
        <img src={ScreenshotThree} />
      </Carousel.Item>
      <Carousel.Item>
        <img src={ScreenshotFour} />
      </Carousel.Item>
    </Carousel>*/}
      <div className={clsx("position-absolute", extension, left)} />
      <div className={clsx("position-absolute", extension, right)} />
      <div className={clsx("d-flex pl-3 pr-3 flex-column flex-lg-row", textContent)}>
        <div className="d-flex flex-column flex-md-row flex-lg-column justify-content-center text-center text-lg-right mb-2 mb-lg-0 mr-0 mr-lg-3 ">
          <h4 className="white mr-2 mr-lg-0 mb-1 mb-md-0 mb-lg-2">Suit up.</h4>
          <h4 className="white mr-2 mr-lg-0 mb-1 mb-md-0 mb-lg-2">Shoot 'em up.</h4>
          <h4 className="white mb-0">Level up.</h4>
        </div>
        <div className={clsx(desc, "text-center d-flex flex-column justify-content-center")}>
          <p className="white m-0">
            1986. Armor suits, shiny guns and a badass attitude are up for grabs. And guess what? There are bad guys to take care of.
        </p>
          <p className="white m-0">
            Global Steel is a 2d run and gun video game inspired by Saturday morning cartoons of the 80s.
        </p>
        </div>
      </div>
    </div>
  </>
}
