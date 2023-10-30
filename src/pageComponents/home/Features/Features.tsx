import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import clsx from 'clsx';

import LoadedImg from '../../../components/atoms/LoadedImg';

import { root, featureRow } from './Features.module.scss';

import Players from './images/players@1x.webp';
import Enemies from './images/enemies@1x.webp';
import Upgrades from './images/upgrades@1x.webp';

interface FeatureProps {
  imgUrl: string;
  imgOnLeft?: boolean;
  heading: string;
  descriptionOne: string;
  descriptionTwo: string;
}

function Feature({
  imgUrl,
  imgOnLeft = true,
  heading,
  descriptionOne,
  descriptionTwo,
}: FeatureProps) {
  const imgContent = <LoadedImg src={imgUrl} alt="" className="mw-100" />;

  const textContent = (
    <>
      <h2 className="mb-4">{heading}</h2>
      <p>{descriptionOne}</p>
      <p>{descriptionTwo}</p>
    </>
  );

  return (
    <Row className={clsx(featureRow, 'd-flex')}>
      <Col md={5} className="d-flex flex-column justify-content-center order-2 order-md-1">
        {imgOnLeft ? imgContent : textContent}
      </Col>
      <Col
        md={{ span: 6, offset: 1 }}
        className="d-flex flex-column justify-content-center order-1 order-md-2"
      >
        {imgOnLeft ? textContent : imgContent}
      </Col>
    </Row>
  );
}

export default function Features() {
  return (
    <div className={root}>
      <Container className="text-center">
        <Feature
          imgUrl={Players}
          heading="THE GOOD"
          descriptionOne="Shooting and blasting your way through hordes of enemies in an armored suit ...can be
              quite fun."
          descriptionTwo="Control three different characters in a world inspired by the cartoons of the 80s."
        />
        <Feature
          imgUrl={Enemies}
          imgOnLeft={false}
          heading="THE BAD"
          descriptionOne="The world out there is crawling with evil and you've signed up to take care of it."
          descriptionTwo="Travel through an assortment of locations fighting a variety of bosses and enemies."
        />
        <Feature
          imgUrl={Upgrades}
          heading="...AND, THE UPGRADES"
          descriptionOne="Fighting your way through evil is not only fun, but also incredibly rewarding."
          descriptionTwo="With each kill, earn points and customize your equipment to switch up gameplay."
        />
      </Container>
    </div>
  );
}
