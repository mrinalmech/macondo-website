import React from 'react';
import clsx from 'clsx';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';

import { root, featureRow } from './Features.module.scss';

interface FeatureProps {
  imgName: string;
  imgAlt?: string;
  imgOnLeft?: boolean;
  heading: string;
  description: string;
}

function Feature({ imgName, imgAlt = '', imgOnLeft = true, heading, description }: FeatureProps) {
  const { allFile } = useStaticQuery(query) as {
    allFile: {
      nodes: FileSystemNode[];
    };
  };

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
      <h1 className="mb-4 text-2xl">{heading}</h1>
      <p>{description}</p>
    </>
  );

  return (
    <div className={clsx(featureRow, 'grid grid-cols-1 md:grid-cols-2 gap-20')}>
      <div
        className={clsx('flex flex-col justify-center md:order-1', {
          ['order-2']: imgOnLeft,
          ['order-1']: !imgOnLeft,
        })}
      >
        {imgOnLeft ? imgContent : textContent}
      </div>
      <div
        className={clsx('flex flex-col justify-center md:order-2', {
          ['order-1']: imgOnLeft,
          ['order-2']: !imgOnLeft,
        })}
      >
        {imgOnLeft ? textContent : imgContent}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <div className={root}>
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <div className="max-w-2xl mx-auto mb-20">
          <iframe
            title="steam-widget"
            src="https://store.steampowered.com/widget/1073970/"
            width="100%"
            height="190"
            className="border-0 mb-5"
          />
        </div>

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
      </div>
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
