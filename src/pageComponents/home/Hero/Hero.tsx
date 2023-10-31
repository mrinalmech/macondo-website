import React, { useContext, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Carousel from 'react-bootstrap/Carousel';

import FadeInElement from '../../../components/atoms/FadeInElement';
import LoadedImg from '../../../components/atoms/LoadedImg';

import { LoadingContext } from '../../../contexts/LoadingContext';

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
        animType="delay"
        imgName="logo"
        className={clsx('position-absolute pl-2 pr-2 pl-sm-0 pr-sm-0 ', logo)}
      />
      <LoadedImg imgName="wallShade" className={clsx('position-absolute', wallShade)} />
      <LoadedImg imgName="websiteBaseL1" className={clsx('position-absolute', baseL1, left)} />
      <LoadedImg imgName="websiteBaseL2" className={clsx('position-absolute', baseL2, left)} />
      <LoadedImg imgName="websiteBaseL1" className={clsx('position-absolute', baseL1, right)} />
      <LoadedImg imgName="websiteBaseL2" className={clsx('position-absolute', baseL2, right)} />
    </>
  );
}

function Monitor() {
  const allImgsLoaded = !useContext(LoadingContext);

  const monitorEl = useRef(null);

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
    if (allImgsLoaded && !dimensions.height) {
      calculateDimensions();
    }
  }, [allImgsLoaded]);

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
      <LoadedImg ref={monitorEl} imgName="monitor" className={clsx('position-absolute', monitor)} />
      <Carousel
        className={clsx(carousel, 'position-absolute')}
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
            <LoadedImg imgName={img.imgName} animType="delay" alt={img.alt} />
          </Carousel.Item>
        ))}
      </Carousel>
      <FadeInElement
        className={clsx('position-absolute', extension, left)}
        fadeIn={allImgsLoaded}
      />
      <FadeInElement
        className={clsx('position-absolute', extension, right)}
        fadeIn={allImgsLoaded}
      />
    </>
  );
}

function TextContent() {
  const allImgsLoaded = !useContext(LoadingContext);

  return (
    <FadeInElement
      className={clsx('d-flex pl-3 pr-3 flex-column flex-lg-row', textContent)}
      animType="doubleDelay"
      fadeIn={allImgsLoaded}
    >
      <div className="d-flex flex-column flex-md-row flex-lg-column justify-content-center text-center text-lg-right mb-2 mb-lg-0 mr-0 mr-lg-3 ">
        <h4 className="white mr-2 mr-lg-0 mb-1 mb-md-0 mb-lg-2">Suit up.</h4>
        <h4 className="white mr-2 mr-lg-0 mb-1 mb-md-0 mb-lg-2">Shoot 'em up.</h4>
        <h4 className="white mb-0">Level up.</h4>
      </div>
      <div className={clsx(desc, 'text-center d-flex flex-column justify-content-center')}>
        <p className="white m-0">
          1986. Armor suits, shiny guns and a badass attitude are up for grabs. And guess what?
          There are bad guys to take care of.
        </p>
        <p className="white m-0">
          Global Steel is a 2d run-and-gun video game inspired by Saturday-morning cartoons from the
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
          `d-flex
    align-items-end
    justify-content-center
    pb-4
    pb-sm-2
    pb-md-4
    position-relative
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
