import React, { useContext, useEffect, useRef, forwardRef, memo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
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
  forwardRef(({ imgName, alt = '', animType, className }: Props, ref) => {
    const imgEl = useRef(null);

    const appReady = useContext(AppReadyContext);
    const imageLoaded = useContext(ImageLoadedContext);

    const handleLoad = () => {
      imageLoaded(imgName);
    };

    useEffect(() => {
      const imgContainer = ref ? ref.current : imgEl.current;
      const gatsbyWrapper = $(imgContainer).children('div')[0];
      const img = $(gatsbyWrapper).children('img')[0];

      if (img && img.complete) {
        imageLoaded(imgName);
      }
    }, []);

    const { monitorImg, otherImgs } = useStaticQuery(query);
    const allImgs = monitorImg.nodes.concat(otherImgs.nodes);

    const img = allImgs.find(file => file.name === imgName);

    if (img) {
      const image = getImage(img);

      if (image) {
        return (
          <FadeInElement
            fadeIn={appReady}
            animType={animType}
            className={className}
            ref={ref || imgEl}
          >
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
