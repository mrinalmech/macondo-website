import React, { useState, useEffect, useRef, useCallback, useContext, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { useStaticQuery, graphql } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';
import { IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import clsx from 'clsx';
import { useInterval } from 'usehooks-ts';

import { selectAppLoaded } from '../../../store/appSlice';

import FadeInElement from '../../../components/atoms/FadeInElement';
import LoadedImg, { LoadedImgPropsBase } from '../../../components/atoms/LoadedImg';

import { HeroImageLoadedContext } from '../../../contexts/HeroImageLoadedContext';

import {
  root,
  desc,
  monitor,
  extension,
  wallShade,
  logo,
  baseL1,
  baseL2,
  left,
  right,
  textContent,
  slideShow,
} from './Hero.module.scss';

import { SLIDE_DURATION } from './constants';

interface ComponentProps {
  getImgData: (imgName: string) => IGatsbyImageData | null;
}

interface SlideshowProps extends ComponentProps {
  style?: React.CSSProperties;
}

const getImgDataFromFiles = (imgName: string, imgs: FileSystemNode[]): IGatsbyImageData | null => {
  const img = imgs.find((file: FileSystemNode) => file.name === imgName);

  if (img) {
    const image = getImage(img);

    if (image) {
      return image;
    }
  }

  return null;
};

const HeroLoadedImg = forwardRef<HTMLDivElement, LoadedImgPropsBase>(function HeroLoadedImg(
  props,
  ref,
) {
  const imageLoaded = useContext(HeroImageLoadedContext);

  return <LoadedImg ref={ref} imageLoaded={imageLoaded} {...props} />;
});

function BackgroundImages({ getImgData }: ComponentProps) {
  const { t } = useTranslation();
  const appLoaded = useSelector(selectAppLoaded);

  return (
    <>
      <HeroLoadedImg
        animType="doubleDelay"
        imgName="logo"
        imgData={getImgData('logo')}
        alt={t('game_logo_alt') || 'Game Logo'}
        className={clsx('absolute', logo)}
        fadeIn={appLoaded}
      />
      <HeroLoadedImg
        imgName="wallShade"
        imgData={getImgData('wallShade')}
        testId="wall-shade"
        className={clsx('absolute', wallShade)}
        fadeIn={appLoaded}
      />
      <HeroLoadedImg
        imgName="websiteBaseL1"
        imgData={getImgData('websiteBaseL1')}
        testId="websiteBaseL1-left"
        className={clsx('absolute', baseL1, left)}
        fadeIn={appLoaded}
      />
      <HeroLoadedImg
        imgName="websiteBaseL2"
        imgData={getImgData('websiteBaseL2')}
        testId="websiteBaseL2-left"
        className={clsx('absolute', baseL2, left)}
        fadeIn={appLoaded}
      />
      <HeroLoadedImg
        imgName="websiteBaseL1"
        imgData={getImgData('websiteBaseL1')}
        testId="websiteBaseL1-right"
        className={clsx('absolute', baseL1, right)}
        fadeIn={appLoaded}
      />
      <HeroLoadedImg
        imgName="websiteBaseL2"
        imgData={getImgData('websiteBaseL2')}
        testId="websiteBaseL2-right"
        className={clsx('absolute', baseL2, right)}
        fadeIn={appLoaded}
      />
    </>
  );
}

function Slideshow({ style, getImgData }: SlideshowProps) {
  const { t } = useTranslation();
  const appLoaded = useSelector(selectAppLoaded);

  const imgsData = [
    {
      imgName: 'screenshot0',
      imgData: getImgData('screenshot0'),
      alt: t('screenshot_0_alt'),
    },
    {
      imgName: 'screenshot1',
      imgData: getImgData('screenshot1'),
      alt: t('screenshot_1_alt'),
    },
    {
      imgName: 'screenshot2',
      imgData: getImgData('screenshot2'),
      alt: t('screenshot_2_alt'),
    },
    {
      imgName: 'screenshot3',
      imgData: getImgData('screenshot3'),
      alt: t('screenshot_3_alt'),
    },
    {
      imgName: 'screenshot4',
      imgData: getImgData('screenshot4'),
      alt: t('screenshot_4_alt'),
    },
  ];

  const [active, setActive] = useState(0);

  const updateActive = () => {
    const newActive = (active + 1) % imgsData.length;
    setActive(newActive);
  };

  useInterval(() => {
    updateActive();
  }, SLIDE_DURATION * 1000);

  return (
    <div className={clsx('absolute', slideShow)} style={style}>
      {imgsData.map((img, index) => {
        return (
          <div
            key={index}
            className={clsx('absolute transition-opacity duration-1000 h-full w-full', {
              'opacity-0': active !== index,
            })}
          >
            <HeroLoadedImg
              imgName={img.imgName}
              imgData={img.imgData}
              animType="doubleDelay"
              alt={img.alt}
              className="h-full w-full"
              fadeIn={appLoaded}
            />
          </div>
        );
      })}
    </div>
  );
}

function Monitor({ getImgData }: ComponentProps) {
  const appLoaded = useSelector(selectAppLoaded);

  const monitorEl = useRef<HTMLDivElement | null>(null);

  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
    bottom: 0,
  });

  const calculateDimensions = () => {
    if (monitorEl?.current) {
      const style = getComputedStyle(monitorEl.current);
      const bottom = style?.bottom?.slice(0, -2) || '0';

      setDimensions({
        height: monitorEl.current.clientHeight * 0.47,
        width: monitorEl.current.clientWidth * 0.182,
        bottom: parseInt(bottom) + monitorEl.current.clientHeight * 0.24,
      });
    }
  };

  useEffect(() => {
    if (appLoaded && !dimensions.height) {
      calculateDimensions();
    }
  }, [appLoaded, dimensions.height]);

  useEffect(() => {
    window.addEventListener('resize', calculateDimensions);

    calculateDimensions();

    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  return (
    <>
      <HeroLoadedImg
        ref={monitorEl}
        imgName="monitor"
        imgData={getImgData('monitor')}
        testId="monitor"
        className={clsx('absolute', monitor)}
        animType="delay"
        fadeIn={appLoaded}
      />
      <Slideshow
        style={{
          height: dimensions.height,
          width: dimensions.width,
          bottom: dimensions.bottom,
        }}
        getImgData={getImgData}
      />
      <FadeInElement className={clsx('absolute', extension, left)} fadeIn={appLoaded} />
      <FadeInElement className={clsx('absolute', extension, right)} fadeIn={appLoaded} />
    </>
  );
}

function TextContent() {
  const appLoaded = useSelector(selectAppLoaded);

  return (
    <FadeInElement
      className={clsx('flex flex-col lg:flex-row items-center px-3', textContent)}
      animType="doubleDelay"
      fadeIn={appLoaded}
    >
      <div
        className={clsx(
          'flex flex-col md:flex-row lg:flex-col justify-center text-center lg:text-right mb-2 md:mb-1 lg:mb-0 mr-0 lg:mr-1 font-retro',
        )}
      >
        <p className="white mr-2 lg:mr-0 mb-0 text-xl sm:text-2xl">
          <Trans i18nKey="game_tagline_1">Suit up.</Trans>
        </p>
        <p className="white mr-2 lg:mr-0 mb-0 text-xl sm:text-2xl">
          <Trans i18nKey="game_tagline_2">Shoot &lsquo;em up.</Trans>
        </p>
        <p className="white mb-0 text-xl sm:text-2xl">
          <Trans i18nKey="game_tagline_3">Level up.</Trans>
        </p>
      </div>
      <div className={clsx(desc, 'text-center flex flex-col justify-center mb-2 lg:mb-0')}>
        <p className="white m-0 font-sans text-sm sm:text-base">
          <Trans i18nKey="game_desc">
            Global Steel is a 2d run-and-gun video game inspired by Saturday-morning cartoons of the
            80s.
          </Trans>
        </p>
      </div>
    </FadeInElement>
  );
}

export default function Hero() {
  const { otherHeroImgs, logoImg, monitorImg } = useStaticQuery(query);

  const allImgs = otherHeroImgs.nodes.concat(monitorImg.nodes).concat(logoImg.nodes);

  const getImgData = useCallback(
    (imgName: string) => getImgDataFromFiles(imgName, allImgs),
    [allImgs],
  );

  return (
    <>
      <div
        className={clsx(
          root,
          `flex
    items-end
    justify-center
    pb-4
    relative
    overflow-hidden`,
        )}
      >
        <BackgroundImages getImgData={getImgData} />
        <Monitor getImgData={getImgData} />
        <TextContent />
      </div>
    </>
  );
}

const query = graphql`
  query {
    monitorImg: allFile(
      filter: { sourceInstanceName: { eq: "loadingHeroImages" }, name: { eq: "monitor" } }
    ) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(placeholder: NONE, layout: FIXED)
        }
      }
    }
    logoImg: allFile(
      filter: { sourceInstanceName: { eq: "loadingHeroImages" }, name: { eq: "logo" } }
    ) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(
            placeholder: NONE
            width: 420
            sizes: "(max-width: 320px) 230px, (max-width: 360px) 280px, (max-width: 480px) 320px, (max-width: 700px) 360px, (max-width: 992px) 380px, 420px"
            breakpoints: [230, 280, 320, 360, 380, 420]
          )
        }
      }
    }
    otherHeroImgs: allFile(
      filter: {
        sourceInstanceName: { eq: "loadingHeroImages" }
        name: { nin: ["monitor", "logo"] }
      }
    ) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(placeholder: NONE)
        }
      }
    }
  }
`;
