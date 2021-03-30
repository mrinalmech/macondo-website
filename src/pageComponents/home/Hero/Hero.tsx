import React from "react"
import clsx from "clsx"

import { root, desc, monitor, wallShade, screenshot } from "./Hero.module.scss"

import Monitor1x from "./images/monitor@1x.png"
import Monitor2x from "./images/monitor@2x.png"
import Monitor3x from "./images/monitor@3x.png"
import Monitor4x from "./images/monitor@4x.png"
import WallShade1x from "./images/wallShade@1x.png"
import WallShade2x from "./images/wallShade@2x.png"
import WallShade3x from "./images/wallShade@3x.png"
import WallShade4x from "./images/wallShade@4x.png"

import ScreenshotOne from "./images/screenshot-1.jpg"

export default function Hero() {

  return <div className={clsx(root, "d-flex align-items-end justify-content-center pb-1 pb-md-2 pb-lg-3 position-relative overflow-hidden")}>
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
    <img src={ScreenshotOne} className={clsx("position-absolute", screenshot)}/>
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
    <div className="d-flex">
      <div className="d-flex flex-lg-column text-center text-lg-right mr-0 mr-lg-5 ">
        <h4 className="white mr-2 mr-lg-0">Suit up.</h4>
        <h4 className="white mr-2 mr-lg-0">Shoot 'em' up.</h4>
        <h4 className="white">Level up.</h4>
      </div>
      <div className={clsx(desc, "text-center d-none d-lg-block")}>
        <small className="white">
          1986. Armor suits, shiny guns and a badass attitude are up for grabs. And guess what? There are bad guys to take care of.
          </small>
        <br />
        <small className="white">
          Global Steel follows the adventures of an organization which travels around the world, dispensing justice. In style.
        </small>
      </div>
    </div>
  </div>

}
