import React, { useContext, useEffect, useRef, forwardRef, memo, useImperativeHandle } from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import $ from 'jquery';

import FadeInElement from '../FadeInElement';

import { ImageLoadedContext } from '../../../contexts/ImageLoadedContext';
import { AppReadyContext } from '../../../contexts/AppReadyContext';

interface Props {
  imgName: string;
  imgData: IGatsbyImageData | null;
  alt?: string;
  className?: string;
  animType?: 'normal' | 'delay' | 'doubleDelay';
  testId?: string;
}

const LoadedImg = memo(
  forwardRef<HTMLDivElement, Props>(
    ({ imgName, imgData, alt = '', animType, className, testId }, forwardedRef) => {
      const ref = useRef<HTMLDivElement | null>(null);

      useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);

      const appReady = useContext(AppReadyContext);
      const imageLoaded = useContext(ImageLoadedContext);

      const handleLoad = () => {
        imageLoaded(imgName);
      };

      useEffect(() => {
        const imgContainer = ref.current;

        if (imgContainer) {
          const gatsbyWrapper = $(imgContainer).children('div')[0];
          const img = $(gatsbyWrapper).children('img')[0] as HTMLImageElement;
          if (img && img.complete) {
            imageLoaded(imgName);
          }
        }
      }, [imageLoaded, imgName]);

      if (imgData) {
        return (
          <FadeInElement
            fadeIn={appReady}
            animType={animType}
            className={className}
            ref={ref}
            testId={testId}
          >
            <GatsbyImage
              image={imgData}
              objectFit="cover"
              alt={alt}
              onLoad={handleLoad}
              loading="eager"
              className="h-full w-full"
            />
          </FadeInElement>
        );
      }

      return null;
    },
  ),
);

LoadedImg.displayName = 'LoadedImg';

export default LoadedImg;
