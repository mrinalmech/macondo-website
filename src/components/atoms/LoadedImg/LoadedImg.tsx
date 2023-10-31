import React, { useContext, useEffect, useRef, useState, forwardRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import $ from 'jquery';

import FadeInElement from '../FadeInElement';

import { ImageLoadedContext } from '../../../contexts/ImageLoadedContext';
import { LoadingContext } from '../../../contexts/LoadingContext';

interface Props {
  imgName: string;
  alt?: string;
  className?: string;
  animType?: 'normal' | 'delay' | 'doubleDelay';
}

const LoadedImg = forwardRef(({ imgName, alt = '', animType, className }: Props, ref) => {
  const imgEl = useRef(null);

  const allImgsLoaded = !useContext(LoadingContext);
  const imageLoaded = useContext(ImageLoadedContext);

  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    if (!loaded) {
      imageLoaded(imgName);
    }
  };

  useEffect(() => {
    const imgContainer = ref ? ref.current : imgEl.current;
    const gatsbyWrapper = $(imgContainer).children('div')[0];
    const img = $(gatsbyWrapper).children('img')[0];

    if (img && img.complete) {
      setLoaded(true);
      imageLoaded(imgName);
    }
  }, []);

  const { allFile } = useStaticQuery(query);

  let imgContent = null as React.ReactNode | null;

  const img = allFile.nodes.find(file => file.name === imgName);

  if (img) {
    const image = getImage(img);

    if (image) {
      imgContent = <GatsbyImage image={image} objectFit="cover" alt={alt} onLoad={handleLoad} />;
    }
  }

  return (
    <FadeInElement
      fadeIn={allImgsLoaded}
      animType={animType}
      className={className}
      ref={ref || imgEl}
    >
      {imgContent}
    </FadeInElement>
  );
});

export default LoadedImg;

const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "loadingHeroImages" } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(placeholder: NONE)
        }
      }
    }
  }
`;
