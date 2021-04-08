import React from "react"
import clsx from "clsx"
import Carousel from "react-bootstrap/Carousel"

import {
  root,
  desc,
  monitor,
  wallShade,
  carousel,
  logo,
  baseL1,
  baseL2,
  left,
  right,
  textContent
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

import ScreenshotOne from "./images/screenshot-1.jpg"
import ScreenshotTwo from "./images/screenshot-2.jpg"
import ScreenshotThree from "./images/screenshot-3.png"
import ScreenshotFour from "./images/screenshot-4.png"

export default function Hero() {

  return <div className={clsx(root, `d-flex
    align-items-end
    justify-content-center
    pb-4
    position-relative
    overflow-hidden`
  )}>
    <img
      src={Logo1x}
      srcSet={
        `${Logo4x} 4x,
      ${Logo3x} 3x,
      ${Logo2x} 2x,
      ${Logo1x} 1x`
      }
      alt=""
      className={clsx("position-absolute", logo)}
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
    />
    <Carousel
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
    </Carousel>
    <div className={clsx("d-flex pl-2 pr-2 pl-sm-0 pr-sm-0 flex-column flex-lg-row", textContent)}>
      <div className="d-flex flex-lg-column justify-content-center text-center text-lg-right mb-2 mb-lg-0 mr-0 mr-lg-3 ">
        <h4 className="white mr-2 mr-lg-0 mb-0 mb-lg-2">Suit up.</h4>
        <h4 className="white mr-2 mr-lg-0 mb-0 mb-lg-2">Shoot 'em up.</h4>
        <h4 className="white mb-0">Level up.</h4>
      </div>
      <div className={clsx(desc, "text-center")}>
        <small className="white">
          1986. Armor suits, shiny guns and a badass attitude are up for grabs. And guess what? There are bad guys to take care of.
        </small>
        <br />
        <small className="white">
          Global Steel is a 2d run and gun video game inspired by Saturday morning cartoons of the 80s.
        </small>
      </div>
    </div>
  </div>

}
