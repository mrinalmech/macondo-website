import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import clsx from 'clsx';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';

import { root, featureRow } from './Features.module.scss';

interface FeatureProps {
  imgName: string;
  imgAlt?: string;
  imgOnLeft?: boolean;
  heading: string;
  descriptionOne: string;
  descriptionTwo: string;
}

function Feature({
  imgName,
  imgAlt = '',
  imgOnLeft = true,
  heading,
  descriptionOne,
  descriptionTwo,
}: FeatureProps) {
  const { allFile } = useStaticQuery(query);

  let imgContent = null as React.ReactNode | null;

  const img = allFile.nodes.find(file => file.name === imgName);

  if (img) {
    const image = getImage(img);

    if (image) {
      imgContent = <GatsbyImage image={image} alt={imgAlt} objectFit="cover" className="mw-100" />;
    }
  }

  const textContent = (
    <>
      <h1 className="mb-4 h2">{heading}</h1>
      <p>{descriptionOne}</p>
      <p>{descriptionTwo}</p>
    </>
  );

  return (
    <Row className={clsx(featureRow, 'd-flex')}>
      <Col
        md={5}
        className={clsx('d-flex flex-column justify-content-center order-md-1', {
          ['order-2']: imgOnLeft,
          ['order-1']: !imgOnLeft,
        })}
      >
        {imgOnLeft ? imgContent : textContent}
      </Col>
      <Col
        md={{ span: 6, offset: 1 }}
        className={clsx('d-flex flex-column justify-content-center order-md-2', {
          ['order-1']: imgOnLeft,
          ['order-2']: !imgOnLeft,
        })}
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
          imgName="players"
          imgAlt="Players"
          heading="THE GOOD"
          descriptionOne="Shooting and blasting your way through hordes of enemies in an armored suit ...can be
              quite fun."
          descriptionTwo="Control three different characters in a world inspired by the cartoons of the 80s."
        />
        <Feature
          imgName="enemies"
          imgAlt="Enemies"
          imgOnLeft={false}
          heading="THE BAD"
          descriptionOne="The world out there is crawling with evil and you've signed up to take care of it."
          descriptionTwo="Travel through an assortment of locations fighting a variety of bosses and enemies."
        />
        <Feature
          imgName="upgrades"
          imgAlt="Upgrades"
          heading="...AND, THE UPGRADES"
          descriptionOne="Fighting your way through evil is not only fun, but also incredibly rewarding."
          descriptionTwo="With each kill, earn points and customize your equipment to switch up gameplay."
        />
      </Container>
    </div>
  );
}

const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "featureImages" } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(width: 540)
        }
      }
    }
  }
`;
