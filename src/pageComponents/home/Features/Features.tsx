import React from "react"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import clsx from "clsx"

import { root, featureRow } from "./Features.module.scss"

import Players1x from "./images/players@1x.png"
import Players2x from "./images/players@2x.png"
import Players3x from "./images/players@3x.png"
import Players4x from "./images/players@4x.png"
import Enemies1x from "./images/enemies@1x.png"
import Enemies2x from "./images/enemies@2x.png"
import Enemies3x from "./images/enemies@3x.png"
import Enemies4x from "./images/enemies@4x.png"
import Upgrades1x from "./images/upgrades@1x.png"
import Upgrades2x from "./images/upgrades@2x.png"
import Upgrades3x from "./images/upgrades@3x.png"
import Upgrades4x from "./images/upgrades@4x.png"

interface Props {
  imageLoaded: () => any
}

export default function Features({ imageLoaded }: Props) {
  return <div className={root}>
    <Container>
      <Row className={clsx(featureRow, "d-flex")}>
        <Col
          md={5}
          className="d-flex flex-column justify-content-center order-2 order-md-1"
        >
          <img
            onLoad={imageLoaded}
            src={Players1x}
            srcSet={
              `${Players4x} 4x,
            ${Players3x} 3x,
            ${Players2x} 2x,
            ${Players1x} 1x`
            }
            alt=""
            className="mw-100"
          />
        </Col>
        <Col
          md={{ span: 6, offset: 1 }}
          className="d-flex flex-column justify-content-center order-1 order-md-2"
        >
          <h2 className="light-blue text-center mb-4">THE GOOD</h2>
          <p className="light-blue text-center">
            Sometimes, shooting and blasting your way through
            hordes of enemies as you relentlessly run around in an
            armored suit ...can be quite fun.
          </p>
          <p className="light-blue text-center">
            Control three different characters in an 80s Saturday Morning Cartoon inspired world.
          </p>
        </Col>
      </Row>
      <Row className={clsx(featureRow, "d-flex")}>
        <Col
          md={5}
          className="d-flex flex-column justify-content-center"
        >
          <h2 className="light-blue text-center mb-4">THE BAD</h2>
          <p className="light-blue text-center">
            The world out there is crawling with evil and you've signed up to take care of it.
            Travel across exotic locations and fight an assortment of bad guys.
          </p>
          <p className="light-blue text-center">
            A variety of bosses and enemies with replayable missions.
          </p>
        </Col>
        <Col
          md={{ span: 6, offset: 1 }}
          className="d-flex flex-column justify-content-center"
        >
          <img
            onLoad={imageLoaded}
            src={Enemies1x}
            srcSet={
              `${Enemies4x} 4x,
            ${Enemies3x} 3x,
            ${Enemies2x} 2x,
            ${Enemies1x} 1x`
            }
            alt=""
            className="mw-100"
          />
        </Col>
      </Row>
      <Row className={clsx(featureRow, "d-flex")}>
        <Col
          md={5}
          className="d-flex flex-column justify-content-center order-2 order-md-1"
        >
          <img
            onLoad={imageLoaded}
            src={Upgrades1x}
            srcSet={
              `${Upgrades4x} 4x,
            ${Upgrades3x} 3x,
            ${Upgrades2x} 2x,
            ${Upgrades1x} 1x`
            }
            alt=""
            className="mw-100"
          />
        </Col>
        <Col
          md={{ span: 6, offset: 1 }}
          className="d-flex flex-column justify-content-center order-1 order-md-2"
        >
          <h2 className="light-blue text-center mb-4">...AND, THE UPGRADES</h2>
          <p className="light-blue text-center">
            Fighting your way through evil is not only fun, it's incredibly rewarding. With each kill, earn points and buy some sweet upgrades.
          </p>
          <p className="light-blue text-center">
            Upgrade your arsenal with a variety of gear which switches up gameplay.
          </p>
        </Col>
      </Row>
    </Container>
  </div>
}
