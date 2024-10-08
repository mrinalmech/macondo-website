import React, { useState, useEffect, useRef, useCallback, useContext, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { useStaticQuery, graphql } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';
import { IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import clsx from 'clsx';
import { useInterval } from 'usehooks-ts';

import { selectHeroImgsLoaded, selectLogoShineImgsLoaded } from '../../../store/appSlice';

import FadeInElement from '../../../components/atoms/FadeInElement';
import LoadedImg, { LoadedImgPropsBase } from '../../../components/atoms/LoadedImg';

import { HeroImageLoadedContext } from '../../../contexts/HeroImageLoadedContext';
import { LogoShineImageLoadedContext } from '../../../contexts/LogoShineImageLoadedContext';

import {
  root,
  desc,
  monitor,
  extension,
  wallShade,
  logo,
  logoShine,
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
  const heroImgsLoaded = useSelector(selectHeroImgsLoaded);

  return (
    <>
      <HeroLoadedImg
        animType="doubleDelay"
        imgName="logo"
        imgData={getImgData('logo')}
        alt={t('game_logo_alt') || 'Game Logo'}
        className={clsx('absolute', logo)}
        fadeIn={heroImgsLoaded}
      />
      <HeroLoadedImg
        imgName="wallShade"
        imgData={getImgData('wallShade')}
        testId="wall-shade"
        className={clsx('absolute', wallShade)}
        fadeIn={heroImgsLoaded}
      />
      <HeroLoadedImg
        imgName="websiteBaseL1"
        imgData={getImgData('websiteBaseL1')}
        testId="websiteBaseL1-left"
        className={clsx('absolute', baseL1, left)}
        fadeIn={heroImgsLoaded}
      />
      <HeroLoadedImg
        imgName="websiteBaseL2"
        imgData={getImgData('websiteBaseL2')}
        testId="websiteBaseL2-left"
        className={clsx('absolute', baseL2, left)}
        fadeIn={heroImgsLoaded}
      />
      <HeroLoadedImg
        imgName="websiteBaseL1"
        imgData={getImgData('websiteBaseL1')}
        testId="websiteBaseL1-right"
        className={clsx('absolute', baseL1, right)}
        fadeIn={heroImgsLoaded}
      />
      <HeroLoadedImg
        imgName="websiteBaseL2"
        imgData={getImgData('websiteBaseL2')}
        testId="websiteBaseL2-right"
        className={clsx('absolute', baseL2, right)}
        fadeIn={heroImgsLoaded}
      />
    </>
  );
}

const LogoShineLoadedImg = forwardRef<HTMLDivElement, LoadedImgPropsBase>(function HeroLoadedImg(
  props,
  ref,
) {
  const imageLoaded = useContext(LogoShineImageLoadedContext);

  return <LoadedImg ref={ref} imageLoaded={imageLoaded} {...props} />;
});

const LOGO_SHINE_NUMBER_OF_FRAMES = 48;
const LOGO_SHINE_FRAME_DURATION = 1 / 24;

function LogoShineImages({ getImgData }: ComponentProps) {
  const heroImgsLoaded = useSelector(selectHeroImgsLoaded);
  const logoShineImagesLoaded = useSelector(selectLogoShineImgsLoaded);

  const [active, setActive] = useState(0);

  const totalFrames = 2 * LOGO_SHINE_NUMBER_OF_FRAMES;

  const updateActive = () => {
    const newActive = (active + 1) % totalFrames;
    setActive(newActive);
  };

  useInterval(() => {
    updateActive();
  }, LOGO_SHINE_FRAME_DURATION * 1000);

  const logoShineFrames = [];

  for (let i = 0; i < LOGO_SHINE_NUMBER_OF_FRAMES; i++) {
    const imgName = `logoShine_${i}`;
    const shouldDisplay = active === i && logoShineImagesLoaded;

    logoShineFrames.push(
      <LogoShineLoadedImg
        key={i}
        animType="none"
        imgName={imgName}
        imgData={getImgData(imgName)}
        alt=""
        className="absolute w-full"
        fadeIn={shouldDisplay}
      />,
    );
  }

  return (
    <FadeInElement
      className={clsx('absolute', logo, logoShine)}
      fadeIn={heroImgsLoaded}
      animType="doubleDelay"
    >
      {logoShineFrames}
    </FadeInElement>
  );
}

function Slideshow({ style, getImgData }: SlideshowProps) {
  const { t } = useTranslation();
  const heroImgsLoaded = useSelector(selectHeroImgsLoaded);

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
              fadeIn={heroImgsLoaded}
            />
          </div>
        );
      })}
    </div>
  );
}

function Monitor({ getImgData }: ComponentProps) {
  const heroImgsLoaded = useSelector(selectHeroImgsLoaded);

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
    if (heroImgsLoaded && !dimensions.height) {
      calculateDimensions();
    }
  }, [heroImgsLoaded, dimensions.height]);

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
        fadeIn={heroImgsLoaded}
      />
      <Slideshow
        style={{
          height: dimensions.height,
          width: dimensions.width,
          bottom: dimensions.bottom,
        }}
        getImgData={getImgData}
      />
      <FadeInElement className={clsx('absolute', extension, left)} fadeIn={heroImgsLoaded} />
      <FadeInElement className={clsx('absolute', extension, right)} fadeIn={heroImgsLoaded} />
    </>
  );
}

function TextContent() {
  const heroImgsLoaded = useSelector(selectHeroImgsLoaded);

  return (
    <FadeInElement
      className={clsx('flex flex-col lg:flex-row items-center px-3', textContent)}
      animType="doubleDelay"
      fadeIn={heroImgsLoaded}
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
  const { otherHeroImgs, logoImg, monitorImg, logoShineImgs } = useStaticQuery(query);

  const allImgs = otherHeroImgs.nodes
    .concat(monitorImg.nodes)
    .concat(logoImg.nodes)
    .concat(logoShineImgs.nodes);

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
        <LogoShineImages getImgData={getImgData} />
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
            width: 525
            sizes: "(max-width: 320px) 288px, (max-width: 360px) 350px, (max-width: 480px) 400px, (max-width: 700px) 450px, (max-width: 992px) 475px, 525px"
            breakpoints: [288, 350, 400, 450, 475, 525]
          )
        }
      }
    }
    logoShineImgs: allFile(filter: { sourceInstanceName: { eq: "logoShineImages" } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(
            placeholder: NONE
            width: 525
            sizes: "(max-width: 320px) 288px, (max-width: 360px) 350px, (max-width: 480px) 400px, (max-width: 700px) 450px, (max-width: 992px) 475px, 525px"
            breakpoints: [288, 350, 400, 450, 475, 525]
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
