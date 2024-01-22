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
  description: string;
}

function Feature({ imgName, imgAlt = '', imgOnLeft = true, heading, description }: FeatureProps) {
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
      <p>{description}</p>
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
        <Row>
          <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <iframe
              title="steam-widget"
              src="https://store.steampowered.com/widget/1073970/"
              width="100%"
              height="190"
              className="border-0 mb-5"
            />
          </Col>
        </Row>

        <Feature
          imgName="players"
          imgAlt="Players"
          heading="THE GOOD"
          description="Control three different characters with varying playstyles for maximum replayability."
        />
        <Feature
          imgName="enemies"
          imgAlt="Enemies"
          imgOnLeft={false}
          heading="THE BAD"
          description="Travel through an assortment of locations fighting a number of bosses and enemies."
        />
        <Feature
          imgName="upgrades"
          imgAlt="Upgrades"
          heading="...AND, THE UPGRADES"
          description="Earn points and customize your weaponry to switch up gameplay."
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
