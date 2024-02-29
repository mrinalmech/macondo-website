import React, { useContext, useState, useEffect, useRef } from 'react';
import { Trans } from 'gatsby-plugin-react-i18next';
import clsx from 'clsx';
import { useInterval } from 'usehooks-ts';

import FadeInElement from '../../../components/atoms/FadeInElement';
import LoadedImg from '../../../components/atoms/LoadedImg';

import { AppReadyContext } from '../../../contexts/AppReadyContext';

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

interface SlideshowProps {
  style?: React.CSSProperties;
}

const imgData = [
  {
    imgName: 'screenshot2',
    alt: 'Woman in blue armor marching to fight two suits of animated suits of medieval armor.',
  },
  {
    imgName: 'screenshot1',
    alt: 'Woman in blue armor releasing rockets to attack two enemies in purple armor, one normal height and the other short. Rusted artillery gun in the foreground.',
  },
  {
    imgName: 'screenshot0',
    alt: 'Three figures in front of a monitor screen',
  },
  {
    imgName: 'screenshot3',
    alt: 'Woman in blue armor standing in front of a flaming figure',
  },
  {
    imgName: 'screenshot4',
    alt: 'Woman in blue armor standing at end of bridge. Receives instructions from a black woman with an afro.',
  },
];

function BackgroundImages() {
  return (
    <>
      <LoadedImg
        animType="doubleDelay"
        imgName="logo"
        alt="Game Logo"
        className={clsx('absolute', logo)}
      />
      <LoadedImg imgName="wallShade" alt="WallShade" className={clsx('absolute', wallShade)} />
      <LoadedImg
        imgName="websiteBaseL1"
        alt="WebsiteBaseL1Left"
        className={clsx('absolute', baseL1, left)}
      />
      <LoadedImg
        imgName="websiteBaseL2"
        alt="WebsiteBaseL2Left"
        className={clsx('absolute', baseL2, left)}
      />
      <LoadedImg
        imgName="websiteBaseL1"
        alt="WebsiteBaseL1Right"
        className={clsx('absolute', baseL1, right)}
      />
      <LoadedImg
        imgName="websiteBaseL2"
        alt="WebsiteBaseL2Right"
        className={clsx('absolute', baseL2, right)}
      />
    </>
  );
}

function Slideshow({ style }: SlideshowProps) {
  const [active, setActive] = useState(0);

  const updateActive = () => {
    const newActive = (active + 1) % imgData.length;
    setActive(newActive);
  };

  useInterval(() => {
    updateActive();
  }, SLIDE_DURATION * 1000);

  return (
    <div className={clsx('absolute', slideShow)} style={style}>
      {imgData.map((img, index) => {
        return (
          <div
            key={index}
            className={clsx('absolute transition-opacity duration-1000 h-full w-full', {
              'opacity-0': active !== index,
            })}
          >
            <LoadedImg
              imgName={img.imgName}
              animType="doubleDelay"
              alt={img.alt}
              className="h-full w-full"
            />
          </div>
        );
      })}
    </div>
  );
}

function Monitor() {
  const appReady = useContext(AppReadyContext);

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
    if (appReady && !dimensions.height) {
      calculateDimensions();
    }
  }, [appReady, dimensions.height]);

  useEffect(() => {
    window.addEventListener('resize', calculateDimensions);

    calculateDimensions();

    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  return (
    <>
      <LoadedImg
        ref={monitorEl}
        imgName="monitor"
        alt="Monitor"
        className={clsx('absolute', monitor)}
        animType="delay"
      />
      <Slideshow
        style={{
          height: dimensions.height,
          width: dimensions.width,
          bottom: dimensions.bottom,
        }}
      />
      <FadeInElement className={clsx('absolute', extension, left)} fadeIn={appReady} />
      <FadeInElement className={clsx('absolute', extension, right)} fadeIn={appReady} />
    </>
  );
}

function TextContent() {
  const appReady = useContext(AppReadyContext);

  return (
    <FadeInElement
      className={clsx('flex flex-col lg:flex-row px-3', textContent)}
      animType="doubleDelay"
      fadeIn={appReady}
    >
      <div className="flex flex-col md:flex-row lg:flex-col justify-center text-center lg:text-right mb-2 md:mb-1 lg:mb-0 mr-0 lg:mr-1 font-retro">
        <h1 className="white mr-2 lg:mr-0 mb-0 text-xl sm:text-2xl">
          <Trans i18nKey="game_tagline_1">Suit up.</Trans>
        </h1>
        <h1 className="white mr-2 lg:mr-0 mb-0 text-xl sm:text-2xl">
          <Trans i18nKey="game_tagline_2">Shoot &lsquo;em up.</Trans>
        </h1>
        <h1 className="white mb-0 text-xl sm:text-2xl">
          <Trans i18nKey="game_tagline_3">Level up.</Trans>
        </h1>
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
        <BackgroundImages />
        <Monitor />
        <TextContent />
      </div>
    </>
  );
}
