import React, { useState, useEffect, useRef } from 'react';
import useInterval from '@use-it/interval';
import clsx from 'clsx';
import { useSpring, animated } from 'react-spring';
import Carousel from 'react-bootstrap/Carousel';

import LoadedImg from '../../../components/atoms/LoadedImg';

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
  bgImg,
} from './Hero.module.scss';

import Monitor1x from './images/monitor@1x.webp';
import WallShade1x from './images/wallShade@1x.webp';
import WebsiteBaseL1_1x from './images/websiteBaseL1@1x.webp';
import WebsiteBaseL2_1x from './images/websiteBaseL2@1x.webp';
import Logo1x from './images/logospace@1x.webp';

import Repeat1x from './images/repeat@1x.webp';

import ScreenshotZero from './images/screenshot-0.webp';
import ScreenshotOne from './images/screenshot-1.webp';
import ScreenshotTwo from './images/screenshot-2.webp';
import ScreenshotThree from './images/screenshot-3.webp';
import ScreenshotFour from './images/screenshot-4.webp';

interface Props {
  imageLoaded: () => any;
  loading: boolean;
}

const DURATION = 500;

export default function Hero({ imageLoaded, loading }: Props) {
  const [bgImageLoading, setBgImageLoading] = useState(true);
  const bgImageLoaded = () => {
    setBgImageLoading(false);
    imageLoaded();
  };

  const monitorEl = useRef(null);

  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
    bottom: 0,
  });

  const calculateDimensions = () => {
    if (monitorEl) {
      const style = getComputedStyle(monitorEl.current);
      const bottom = style?.bottom?.slice(0, -2) || '0';

      setDimensions({
        height: monitorEl.current.clientHeight * 0.47,
        width: monitorEl.current.clientWidth * 0.182,
        bottom: parseInt(bottom) + monitorEl.current.clientHeight * 0.24,
      });
    }
  };

  useInterval(() => {
    if (!dimensions.height) {
      calculateDimensions();
    }
  }, 500);

  useEffect(() => {
    // Add event listener
    window.addEventListener('resize', calculateDimensions);

    // Call handler right away so state gets updated with initial window size
    calculateDimensions();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', calculateDimensions);
  }, []); // Empty array ensures that effect is only run on mount

  const fadeSettings = {
    opacity: loading ? 0 : 1,
    from: { opacity: 0 },
    config: { duration: DURATION },
  };

  const delayedFadeSettings = {
    ...fadeSettings,
    delay: DURATION,
  };

  const doubleDelayedFadeSettings = {
    ...fadeSettings,
    delay: DURATION * 2,
  };

  const fadeAnim = useSpring(fadeSettings);
  const delayedFadeAnim = useSpring(delayedFadeSettings);
  const doubleDelayedFadeAnim = useSpring(doubleDelayedFadeSettings);

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
        {bgImageLoading && (
          <LoadedImg
            onLoad={bgImageLoaded}
            src={Repeat1x}
            alt=""
            className={clsx('position-absolute', bgImg)}
          />
        )}
        <LoadedImg
          anim
          onLoad={imageLoaded}
          style={delayedFadeAnim}
          src={Logo1x}
          alt=""
          className={clsx('position-absolute pl-2 pr-2 pl-sm-0 pr-sm-0 ', logo)}
        />
        <LoadedImg
          anim
          onLoad={imageLoaded}
          style={fadeAnim}
          src={WallShade1x}
          alt=""
          className={clsx('position-absolute', wallShade)}
        />
        <LoadedImg
          anim
          onLoad={imageLoaded}
          style={fadeAnim}
          src={WebsiteBaseL1_1x}
          alt=""
          className={clsx('position-absolute', baseL1, left)}
        />
        <LoadedImg
          anim
          onLoad={imageLoaded}
          style={fadeAnim}
          src={WebsiteBaseL2_1x}
          alt=""
          className={clsx('position-absolute', baseL2, left)}
        />
        <LoadedImg
          anim
          onLoad={imageLoaded}
          style={fadeAnim}
          src={WebsiteBaseL1_1x}
          alt=""
          className={clsx('position-absolute', baseL1, right)}
        />
        <LoadedImg
          anim
          onLoad={imageLoaded}
          style={fadeAnim}
          src={WebsiteBaseL2_1x}
          alt=""
          className={clsx('position-absolute', baseL2, right)}
        />
        <LoadedImg
          anim
          onLoad={imageLoaded}
          style={fadeAnim}
          refElem={monitorEl}
          src={Monitor1x}
          alt=""
          className={clsx('position-absolute', monitor)}
        />
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
          <Carousel.Item>
            <LoadedImg
              anim
              onLoad={imageLoaded}
              src={ScreenshotTwo}
              style={delayedFadeAnim}
              alt="Red figure standing in front of ruined castle"
            />
          </Carousel.Item>
          <Carousel.Item>
            <LoadedImg
              anim
              onLoad={imageLoaded}
              src={ScreenshotOne}
              style={delayedFadeAnim}
              alt="Green figure standing in front of forest"
            />
          </Carousel.Item>
          <Carousel.Item>
            <LoadedImg
              anim
              onLoad={imageLoaded}
              src={ScreenshotZero}
              style={delayedFadeAnim}
              alt="Tree figures in front of a monitor screen"
            />
          </Carousel.Item>
          <Carousel.Item>
            <LoadedImg
              anim
              onLoad={imageLoaded}
              src={ScreenshotThree}
              style={delayedFadeAnim}
              alt="Blue figure standing in front of a flaming figure"
            />
          </Carousel.Item>
          <Carousel.Item>
            <LoadedImg
              anim
              onLoad={imageLoaded}
              src={ScreenshotFour}
              style={delayedFadeAnim}
              alt="Blue figure standing on a platform with light beams emanating from the edge"
            />
          </Carousel.Item>
        </Carousel>
        <animated.div className={clsx('position-absolute', extension, left)} style={fadeAnim} />
        <animated.div className={clsx('position-absolute', extension, right)} style={fadeAnim} />
        <animated.div
          className={clsx('d-flex pl-3 pr-3 flex-column flex-lg-row', textContent)}
          style={doubleDelayedFadeAnim}
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
              Global Steel is a 2d run-and-gun video game inspired by Saturday-morning cartoons from
              the 80s.
            </p>
          </div>
        </animated.div>
      </div>
    </>
  );
}
