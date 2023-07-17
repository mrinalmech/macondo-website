import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import clsx from 'clsx';

import LoadedImg from '../../../components/atoms/LoadedImg';

import { root, featureRow } from './Features.module.scss';

import Players1x from './images/players@1x.webp';
import Enemies1x from './images/enemies@1x.webp';
import Upgrades1x from './images/upgrades@1x.webp';

interface Props {
  imageLoaded: () => any;
}

export default function Features({ imageLoaded }: Props) {
  return (
    <div className={root}>
      <Container>
        <Row className={clsx(featureRow, 'd-flex')}>
          <Col md={5} className="d-flex flex-column justify-content-center order-2 order-md-1">
            <LoadedImg onLoad={imageLoaded} src={Players1x} alt="" className="mw-100" />
          </Col>
          <Col
            md={{ span: 6, offset: 1 }}
            className="d-flex flex-column justify-content-center order-1 order-md-2"
          >
            <h2 className="light-blue text-center mb-4">THE GOOD</h2>
            <p className="light-blue text-center">
              Shooting and blasting your way through hordes of enemies in an armored suit ...can be
              quite fun.
            </p>
            <p className="light-blue text-center">
              Control three different characters in a world inspired by the cartoons of the 80s.
            </p>
          </Col>
        </Row>
        <Row className={clsx(featureRow, 'd-flex')}>
          <Col md={5} className="d-flex flex-column justify-content-center">
            <h2 className="light-blue text-center mb-4">THE BAD</h2>
            <p className="light-blue text-center">
              The world out there is crawling with evil and you've signed up to take care of it.
            </p>
            <p className="light-blue text-center">
              Travel through an assortment of locations fighting a variety of bosses and enemies.
            </p>
          </Col>
          <Col md={{ span: 6, offset: 1 }} className="d-flex flex-column justify-content-center">
            <LoadedImg onLoad={imageLoaded} src={Enemies1x} alt="" className="mw-100" />
          </Col>
        </Row>
        <Row className={clsx(featureRow, 'd-flex')}>
          <Col md={5} className="d-flex flex-column justify-content-center order-2 order-md-1">
            <LoadedImg onLoad={imageLoaded} src={Upgrades1x} alt="" className="mw-100" />
          </Col>
          <Col
            md={{ span: 6, offset: 1 }}
            className="d-flex flex-column justify-content-center order-1 order-md-2"
          >
            <h2 className="light-blue text-center mb-4">...AND, THE UPGRADES</h2>
            <p className="light-blue text-center">
              Fighting your way through evil is not only fun, but also incredibly rewarding.
            </p>
            <p className="light-blue text-center">
              With each kill, earn points and customize your equipment to switch up gameplay.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
