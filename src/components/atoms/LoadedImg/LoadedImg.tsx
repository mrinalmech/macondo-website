import React, { useEffect, useRef, forwardRef, memo, useImperativeHandle } from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import FadeInElement from '../FadeInElement';

export interface PropsBase {
  imgName: string;
  imgData: IGatsbyImageData | null;
  fadeIn: boolean;
  alt?: string;
  className?: string;
  animType?: 'normal' | 'delay' | 'doubleDelay';
  testId?: string;
}

interface Props extends PropsBase {
  imageLoaded: (name: string) => void;
}

const LoadedImg = memo(
  forwardRef<HTMLDivElement, Props>(
    (
      { imgName, imgData, fadeIn, imageLoaded, alt = '', animType, className, testId },
      forwardedRef,
    ) => {
      const ref = useRef<HTMLDivElement | null>(null);

      useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);

      const handleLoad = () => {
        imageLoaded(imgName);
      };

      useEffect(() => {
        const imgContainer = ref.current;

        if (imgContainer) {
          const gatsbyWrapper = imgContainer.getElementsByTagName('div')[0];
          const img = gatsbyWrapper.getElementsByTagName('img')[0] as HTMLImageElement;
          if (img && img.complete) {
            imageLoaded(imgName);
          }
        }
      }, [imageLoaded, imgName]);

      if (imgData) {
        return (
          <FadeInElement
            animType={animType}
            className={className}
            ref={ref}
            testId={testId}
            fadeIn={fadeIn}
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
