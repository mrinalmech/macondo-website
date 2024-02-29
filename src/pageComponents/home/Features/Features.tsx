import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';

import { root, widget, featureRow } from './Features.module.scss';

interface FeatureProps {
  imgName: string;
  imgAlt: string;
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
      imgContent = (
        <GatsbyImage image={image} alt={imgAlt} objectFit="contain" className="mw-100" />
      );
    }
  }

  const textContent = (
    <>
      <h1 className="mb-2 sm:mb-4 text-xl sm:text-2xl font-retro">{heading}</h1>
      <p className="font-sans text-sm sm:text-base">{description}</p>
    </>
  );

  return (
    <div
      className={clsx(
        featureRow,
        'grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mb-14 sm:mb-24 md:mb-14 lg:mb-20 last-of-type:mb-0',
      )}
    >
      <div
        className={clsx('flex flex-col justify-center md:order-1', {
          'order-2': imgOnLeft,
          'order-1': !imgOnLeft,
        })}
      >
        {imgOnLeft ? imgContent : textContent}
      </div>
      <div
        className={clsx('flex flex-col justify-center md:order-2', {
          'order-1': imgOnLeft,
          'order-2': !imgOnLeft,
        })}
      >
        {imgOnLeft ? textContent : imgContent}
      </div>
    </div>
  );
}

export default function Features() {
  const { t } = useTranslation();

  return (
    <div className={clsx(root, 'pt-8 sm:pt-12 pb-14 px-6 sm:pt-20 sm:pb-20')}>
      <div className="container p-0 mx-auto max-w-6xl text-center">
        <div className={clsx('max-w-2xl mx-auto mb-10 md:mb-20', widget)}>
          <iframe
            title="steam-widget"
            src="https://store.steampowered.com/widget/1073970/"
            width="100%"
            height="100%"
            className="border-0"
          />
        </div>
        <Feature
          imgName="players"
          imgAlt={t('feature_1_alt')}
          heading={t('feature_1_heading')}
          description={t('feature_1_desc')}
        />
        <Feature
          imgName="enemies"
          imgAlt={t('feature_2_alt')}
          imgOnLeft={false}
          heading={t('feature_2_heading')}
          description={t('feature_2_desc')}
        />
        <Feature
          imgName="upgrades"
          imgAlt={t('feature_3_alt')}
          heading={t('feature_3_heading')}
          description={t('feature_3_desc')}
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
          gatsbyImageData(width: 540, placeholder: NONE)
        }
      }
    }
  }
`;
