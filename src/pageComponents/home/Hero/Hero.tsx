import React, { useContext, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Carousel from 'react-bootstrap/Carousel';

import FadeInElement from '../../../components/atoms/FadeInElement';
import LoadedImg from '../../../components/atoms/LoadedImg';

import { AppReadyContext } from '../../../contexts/AppReadyContext';

import {
  root,
  desc,
  monitor,
  extension,
  wallShade,
  carousel,
  logo,
  baseL1,
  baseL2,
  left,
  right,
  textContent,
} from './Hero.module.scss';

function BackgroundImages() {
  return (
    <>
      <LoadedImg
        animType="doubleDelay"
        imgName="logo"
        alt="Game Logo"
        className={clsx('absolute px-2 sm:px-0', logo)}
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
  }, [appReady]);

  useEffect(() => {
    window.addEventListener('resize', calculateDimensions);

    calculateDimensions();

    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  const imgData = [
    {
      imgName: 'screenshot2',
      alt: 'Red figure standing in front of ruined castle',
    },
    {
      imgName: 'screenshot1',
      alt: 'Green figure standing in front of forest',
    },
    {
      imgName: 'screenshot0',
      alt: 'Three figures in front of a monitor screen',
    },
    {
      imgName: 'screenshot3',
      alt: 'Blue figure standing in front of a flaming figure',
    },
    {
      imgName: 'screenshot4',
      alt: 'Blue figure standing on a platform with light beams emanating from the edge',
    },
  ];

  return (
    <>
      <LoadedImg
        ref={monitorEl}
        imgName="monitor"
        alt="Monitor"
        className={clsx('absolute', monitor)}
        animType="delay"
      />
      <Carousel
        className={clsx(carousel, 'absolute')}
        controls={false}
        indicators={false}
        fade
        style={{
          height: dimensions.height,
          width: dimensions.width,
          bottom: dimensions.bottom,
        }}
      >
        {imgData.map((img, index) => (
          <Carousel.Item key={index}>
            <LoadedImg imgName={img.imgName} animType="doubleDelay" alt={img.alt} />
          </Carousel.Item>
        ))}
      </Carousel>
      <FadeInElement className={clsx('absolute', extension, left)} fadeIn={appReady} />
      <FadeInElement className={clsx('absolute', extension, right)} fadeIn={appReady} />
    </>
  );
}

function TextContent() {
  const allImgsLoaded = useContext(AppReadyContext);

  return (
    <FadeInElement
      className={clsx('flex flex-col lg:flex-row px-3', textContent)}
      animType="doubleDelay"
      fadeIn={allImgsLoaded}
    >
      <div className="flex flex-col md:flex-row lg:flex-col justify-center text-center lg:text-right mb-2 lg:mg-0 mr-0 lg:mr-3 ">
        <h1 className="white mr-2 lg:mr-0 mb-1 text-2xl">Suit up.</h1>
        <h1 className="white mr-2 lg:mr-0 mb-1 text-2xl">Shoot 'em up.</h1>
        <h1 className="white mb-0 text-2xl">Level up.</h1>
      </div>
      <div className={clsx(desc, 'text-center flex flex-col justify-center')}>
        <p className="white m-0">
          Global Steel is a 2d run-and-gun video game inspired by Saturday-morning cartoons of the
          80s.
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
    sm:pb-2
    md:pb-4
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
