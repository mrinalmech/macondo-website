import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { useIntersectionObserver } from 'usehooks-ts';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';

import {
  selectFeaturesImagesLoaded,
  selectSteamLoaded,
  setImageLoaded,
  setSteamLoaded,
} from '../../../store/appSlice';

import { root, widget, featureRow, placeholder } from './Features.module.scss';

interface FeatureProps {
  imgName: string;
  imgsNames: string[];
  imgAlt: string;
  imgOnLeft?: boolean;
  heading: string;
  description: string;
}

function Feature({
  imgName,
  imgsNames,
  imgAlt = '',
  imgOnLeft = true,
  heading,
  description,
}: FeatureProps) {
  const dispatch = useDispatch();
  const imgsLoaded = useSelector(selectFeaturesImagesLoaded);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.45,
  });

  const { allFile } = useStaticQuery(query) as {
    allFile: {
      nodes: FileSystemNode[];
    };
  };

  const [visible, setVisible] = useState(imgsLoaded);

  useEffect(() => {
    if (!visible && isIntersecting) {
      setVisible(true);
      dispatch(setImageLoaded({ imgName, imgsNames }));
    }
  }, [isIntersecting, visible, dispatch, imgName, imgsNames]);

  let imgContent = null as React.ReactNode | null;

  const img = allFile.nodes.find(file => file.name === imgName);

  if (img) {
    const image = getImage(img);

    if (image) {
      imgContent = (
        <GatsbyImage
          image={image}
          alt={imgAlt}
          objectFit="contain"
          className={clsx('mw-100 ease-linear duration-300', {
            '-left-6': !visible && imgOnLeft,
            '-right-6': !visible && !imgOnLeft,
            'left-0': visible && imgOnLeft,
            'right-0': visible && !imgOnLeft,
            'opacity-0': !visible,
          })}
        />
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
        ref={imgOnLeft ? ref : null}
      >
        {imgOnLeft ? imgContent : textContent}
      </div>
      <div
        className={clsx('flex flex-col justify-center md:order-2', {
          'order-1': imgOnLeft,
          'order-2': !imgOnLeft,
        })}
        ref={!imgOnLeft ? ref : null}
      >
        {imgOnLeft ? textContent : imgContent}
      </div>
    </div>
  );
}

function Widget() {
  const dispatch = useDispatch();
  const steamLoaded = useSelector(selectSteamLoaded);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.01,
  });

  const [shouldLoad, setShouldLoad] = useState(steamLoaded);

  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    const isNotAtTop = position !== 0;

    if (!shouldLoad && isNotAtTop) {
      setShouldLoad(true);
    }
  }, [shouldLoad]);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const [visible, setVisible] = useState(steamLoaded);

  useEffect(() => {
    if (isIntersecting && !visible) {
      setVisible(true);
      dispatch(setSteamLoaded(true));
    }
  }, [isIntersecting, visible, dispatch]);

  return (
    <div className={clsx('max-w-2xl mx-auto mb-10 md:mb-20 relative', widget)} ref={ref}>
      <div className={clsx('w-full absolute z-10', placeholder, { 'animate-pulse': !visible })} />
      {shouldLoad && (
        <iframe
          title="steam-widget"
          src="https://store.steampowered.com/widget/1073970/"
          width="100%"
          height="100%"
          className={clsx('border-0 z-20 relative duration-1000', { 'opacity-0': !visible })}
        />
      )}
    </div>
  );
}

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      imgName: 'players',
      imgAlt: t('feature_1_alt'),
      imgOnLeft: true,
      heading: t('feature_1_heading'),
      description: t('feature_1_desc'),
    },
    {
      imgName: 'enemies',
      imgAlt: t('feature_2_alt'),
      imgOnLeft: false,
      heading: t('feature_2_heading'),
      description: t('feature_2_desc'),
    },
    {
      imgName: 'upgrades',
      imgAlt: t('feature_3_alt'),
      imgOnLeft: true,
      heading: t('feature_3_heading'),
      description: t('feature_3_desc'),
    },
  ];

  const imgsNames = features.map(f => f.imgName);

  return (
    <div className={clsx(root, 'pt-8 sm:pt-12 pb-14 px-6 sm:pt-20 sm:pb-20')}>
      <div className="container p-0 mx-auto max-w-6xl text-center">
        <Widget />
        {features.map(f => (
          <Feature
            key={f.imgName}
            imgName={f.imgName}
            imgsNames={imgsNames}
            imgAlt={f.imgAlt}
            imgOnLeft={f.imgOnLeft}
            heading={f.heading}
            description={f.description}
          />
        ))}
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
