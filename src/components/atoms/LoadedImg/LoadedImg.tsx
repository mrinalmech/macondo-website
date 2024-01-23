import React, { useContext, useEffect, useRef, forwardRef, memo, useImperativeHandle } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FileSystemNode } from 'gatsby-source-filesystem';
import $ from 'jquery';

import FadeInElement from '../FadeInElement';

import { ImageLoadedContext } from '../../../contexts/ImageLoadedContext';
import { AppReadyContext } from '../../../contexts/AppReadyContext';

interface Props {
  imgName: string;
  alt?: string;
  className?: string;
  animType?: 'normal' | 'delay' | 'doubleDelay';
}

const LoadedImg = memo(
  forwardRef<HTMLDivElement, Props>(({ imgName, alt = '', animType, className }, forwardedRef) => {
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
    }, []);

    const { monitorImg, otherImgs } = useStaticQuery(query);
    const allImgs = monitorImg.nodes.concat(otherImgs.nodes);

    const img = allImgs.find((file: FileSystemNode) => file.name === imgName);

    if (img) {
      const image = getImage(img);

      if (image) {
        return (
          <FadeInElement fadeIn={appReady} animType={animType} className={className} ref={ref}>
            <GatsbyImage
              image={image}
              objectFit="cover"
              alt={alt}
              onLoad={handleLoad}
              loading="eager"
            />
          </FadeInElement>
        );
      }
    }

    return null;
  }),
);

LoadedImg.displayName = 'FadeInElement';

export default LoadedImg;

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
    otherImgs: allFile(
      filter: { sourceInstanceName: { eq: "loadingHeroImages" }, name: { ne: "monitor" } }
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
